package db

import (
	"database/sql"
	"fmt"
)

// User represents a user in the system.
type User struct {
	ID           string
	Username     string
	Password     string
	Nickname     string
	Avatar       string
	Mark         string
	Email        string
	BaiduName    string
	BaiduAvatar  string
	BaiduNetdiskName string
	BaiduUk int
	BaiduVipType int
	BaiduRefreshToken string
	FlagDelete   int
	CreatedAt    string
	UpdatedAt    string
	DeletedAt    sql.NullString
	LastLoginAt  string
}

// CreateTable creates the users table in the database.
func (u *User) CreateTable() error {
	query := `CREATE TABLE IF NOT EXISTS users (
		id VARCHAR(255) PRIMARY KEY,
		username VARCHAR(255) NOT NULL,
		password VARCHAR(255) NOT NULL,
		nickname VARCHAR(255),
		avatar VARCHAR(255),
		mark VARCHAR(255),
		email VARCHAR(255) UNIQUE,
		baidu_name VARCHAR(255),
		baidu_avatar VARCHAR(255),
		baidu_netdisk_name VARCHAR(255),
		baidu_uk INT,
		baidu_vip_type INT,
		baidu_refresh_token VARCHAR(255),
		flag_delete INT DEFAULT 0,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		deleted_at TIMESTAMP,
		last_login_at TIMESTAMP
	)`
	_, err := DB.Exec(query)
	return err
}

// Playlist represents a user's playlist.
type Playlist struct {
	ID         string
	Name       string
	UserID     string
	FlagDelete int
	CreatedAt  string
	UpdatedAt  string
	DeletedAt  sql.NullString
}

// CreateTable creates the playlists table in the database.
func (p *Playlist) CreateTable() error {
	query := `CREATE TABLE IF NOT EXISTS playlists (
		id VARCHAR(255) PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		user_id VARCHAR(255),
		flag_delete INT DEFAULT 0,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		deleted_at TIMESTAMP
	)`
	_, err := DB.Exec(query)
	return err
}

// PlaylistSong represents a song in a playlist.
type PlaylistSong struct {
	ID         string
	PlaylistID string
	SongID     string
	FlagDelete int
	CreatedAt  string
	UpdatedAt  string
	DeletedAt  sql.NullString
}

// CreateTable creates the playlist_songs table in the database.
func (ps *PlaylistSong) CreateTable() error {
	query := `CREATE TABLE IF NOT EXISTS playlist_songs (
		id VARCHAR(255) PRIMARY KEY,
		playlist_id VARCHAR(255),
		song_id VARCHAR(255),
		flag_delete INT DEFAULT 0,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		deleted_at TIMESTAMP
	)`
	_, err := DB.Exec(query)
	return err
}

// FavoritePlaylist represents a user's favorite playlist.
type FavoritePlaylist struct {
	ID         string
	UserID     string
	PlaylistID string
	FlagDelete int
	CreatedAt  string
	UpdatedAt  string
	DeletedAt  sql.NullString
}

// CreateTable creates the favorites_playlists table in the database.
func (fp *FavoritePlaylist) CreateTable() error {
	query := `CREATE TABLE IF NOT EXISTS favorites_playlists (
		id VARCHAR(255) PRIMARY KEY,
		user_id VARCHAR(255),
		playlist_id VARCHAR(255),
		flag_delete INT DEFAULT 0,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		deleted_at TIMESTAMP
	)`
	_, err := DB.Exec(query)
	return err
}

// FavoriteSong represents a user's favorite song.
type FavoriteSong struct {
	ID         string
	UserID     string
	SongID     string
	FlagDelete int
	CreatedAt  string
	UpdatedAt  string
	DeletedAt  sql.NullString
}

// CreateTable creates the favorites_songs table in the database.
func (fs *FavoriteSong) CreateTable() error {
	query := `CREATE TABLE IF NOT EXISTS favorites_songs (
		id VARCHAR(255) PRIMARY KEY,
		user_id VARCHAR(255),
		song_id VARCHAR(255),
		flag_delete INT DEFAULT 0,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		deleted_at TIMESTAMP
	)`
	_, err := DB.Exec(query)
	return err
}

// Like represents a song liked by a user.
type Like struct {
	ID         string
	UserID     string
	SongID     string
	FlagDelete int
	CreatedAt  string
	UpdatedAt  string
	DeletedAt  sql.NullString
}

// CreateTable creates the likes table in the database.
func (l *Like) CreateTable() error {
	query := `CREATE TABLE IF NOT EXISTS likes (
		id VARCHAR(255) PRIMARY KEY,
		user_id VARCHAR(255),
		song_id VARCHAR(255),
		flag_delete INT DEFAULT 0,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		deleted_at TIMESTAMP
	)`
	_, err := DB.Exec(query)
	return err
}

// Song represents a song in the system.
type Song struct {
	ID         string
	Title      string
	Artist     string
	Album      string
	Duration   int
	FlagDelete int
	CreatedAt  string
	UpdatedAt  string
	DeletedAt  sql.NullString
}

// CreateTable creates the songs table in the database.
func (s *Song) CreateTable() error {
	query := `CREATE TABLE IF NOT EXISTS songs (
		id VARCHAR(255) PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		artist VARCHAR(255),
		album VARCHAR(255),
		duration INT,
		flag_delete INT DEFAULT 0,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		deleted_at TIMESTAMP
	)`
	_, err := DB.Exec(query)
	return err
}

// InitializeTables initializes all tables in the database.
func InitializeTables() error {
	models := []interface {
		CreateTable() error
	}{
		&User{},
		&Playlist{},
		&PlaylistSong{},
		&FavoritePlaylist{},
		&FavoriteSong{},
		&Like{},
		&Song{},
	}

	for _, model := range models {
		if err := model.CreateTable(); err != nil {
			return fmt.Errorf("could not create table: %v", err)
		}
	}

	return nil
}