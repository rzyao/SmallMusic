package db

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

// InitDB initializes the database connection and creates necessary tables.
func InitDB() {
	var err error
	dsn := "root:mysql_pCxdYb@tcp(138.128.220.154:3306)/smallmusic"
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Could not open database: %s\n", err.Error())
	}

	if err = DB.Ping(); err != nil {
		log.Fatalf("Could not connect to database: %s\n", err.Error())
	}

	if err = InitializeTables(); err != nil {
		log.Fatalf("Could not create tables: %s\n", err.Error())
	}
}