package main

import (
	"log"
	"net/http"

	db "backend/db"
	handlers "backend/handlers"
)

func main() {
	db.InitDB()
	http.HandleFunc("/api/baidu_authorization", handlers.BaiduAuthorizationHandler)
	http.HandleFunc("/api/login", handlers.LoginHandler)
	http.HandleFunc("/api/register", handlers.RegisterHandler)
	http.HandleFunc("/api/logout", handlers.LogoutHandler)
	http.HandleFunc("/api/get_user_info", handlers.GetUserInfoHandler)
	http.HandleFunc("/api/get_song_info", handlers.GetSongInfoHandler)
	http.HandleFunc("/api/get_playlist_info", handlers.GetPlaylistInfoHandler)
	http.HandleFunc("/api/get_favorites", handlers.GetFavoritesHandler)
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err.Error())
	}
}
