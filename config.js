module.exports = {
	db: "mysql",
	web: {
		port: 5000,
		host: "0.0.0.0"
	},
	mysql: {
		port: 3306,
		host: "127.0.0.1",
		user: "root",
		password: "root",
		database: "products_basic_db",
		log: false,
		timezone:"08:00"
	}
}
