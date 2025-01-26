package handlers

import (
	"backend/auth"
	"backend/db"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
)

type BaiduUserInfo struct {
	AvatarURL   string `json:"avatar_url"`
	BaiduName   string `json:"baidu_name"`
	Errmsg      string `json:"errmsg"`
	Errno       int    `json:"errno"`
	NetdiskName string `json:"netdisk_name"`
	RequestID   string `json:"request_id"`
	Uk          int    `json:"uk"`
	VipType     int    `json:"vip_type"`
}

type BaiduTokenResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	ExpiresIn    int    `json:"expires_in"`
	Errmsg       string `json:"errmsg"`
	Errno        int    `json:"errno"`
}

func BaiduAuthorizationHandler(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "Code is required", http.StatusBadRequest)
		return
	}

	accessToken, refreshToken, err := getAccessTokenFromCode(code)
	if err != nil {
		fmt.Printf("Error details: %+v\n", err)
		log.Printf("Error details: %+v\n", err)
		http.Error(w, "Failed to get access token", http.StatusInternalServerError)
		return
	}

	userInfo, err := getUserInfoFromBaidu(accessToken)
	if err != nil {
		http.Error(w, "Failed to get user info", http.StatusInternalServerError)
		return
	}

	var user db.User
	err = db.DB.QueryRow("SELECT id, username FROM users WHERE baidu_uk = ?", userInfo.Uk).Scan(&user.ID, &user.Username)
	if err == sql.ErrNoRows {
		// 用户未注册，进行注册
		_, err = db.DB.Exec("INSERT INTO users (username, baidu_name, baidu_avatar, baidu_netdisk_name, baidu_uk, baidu_vip_type, baidu_refresh_token) VALUES (?, ?, ?, ?, ?, ?, ?)",
			userInfo.BaiduName, userInfo.BaiduName, userInfo.AvatarURL, userInfo.NetdiskName, userInfo.Uk, userInfo.VipType, refreshToken)
		if err != nil {
			http.Error(w, "Failed to register user", http.StatusInternalServerError)
			return
		}
		user.Username = userInfo.BaiduName
	} else if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	token, err := auth.GenerateToken(user.Username)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Token: %s", token)
}

func getAccessTokenFromCode(code string) (string, string, error) {
	clientID := "Ativa20pVhgKF5XVNLYD3z1m5PPeNs8n"
	clientSecret := "lprwe934bD9XZbBc8P1T6265NcWMDbBG"
	redirectURI := "https://music.ayaoblog.space/api/baidu_authorization"

	tokenURL := "https://openapi.baidu.com/oauth/2.0/token"
	data := url.Values{}
	data.Set("grant_type", "authorization_code")
	data.Set("code", code)
	data.Set("client_id", clientID)
	data.Set("client_secret", clientSecret)
	data.Set("redirect_uri", redirectURI)
	fmt.Printf("request url: %+v\n", tokenURL+"?"+data.Encode())
	resp, err := http.PostForm(tokenURL, data)
	if err != nil {
		fmt.Printf("Error details: %+v\n", err)
		return "", "", fmt.Errorf("failed to request token: %v", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", "", fmt.Errorf("failed to read response: %v", err)
	}

	var tokenResponse BaiduTokenResponse
	if err := json.Unmarshal(body, &tokenResponse); err != nil {
		return "", "", fmt.Errorf("failed to parse token response: %v", err)
	}

	if tokenResponse.AccessToken == "" {
		return "", "", fmt.Errorf("failed to get access token: %s", tokenResponse.Errmsg)
	}

	return tokenResponse.AccessToken, tokenResponse.RefreshToken, nil
}

func getUserInfoFromBaidu(accessToken string) (*BaiduUserInfo, error) {
	url := fmt.Sprintf("https://pan.baidu.com/rest/2.0/xpan/nas?method=uinfo&access_token=%s", accessToken)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var userInfo BaiduUserInfo
	if err := json.Unmarshal(body, &userInfo); err != nil {
		return nil, err
	}

	if userInfo.Errno != 0 {
		return nil, fmt.Errorf("Baidu API error: %s", userInfo.Errmsg)
	}

	return &userInfo, nil
}
