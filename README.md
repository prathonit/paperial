# Paperial : Library Management System
Done as part of Database Systems CS F212 Project. 

Hosted on [paperial.ml](https://paperial.ml)
# Features: 
- Library catalog with sorting, filtering, and search functions. 
- Book ordering system with option to see upcoming bookings.
- Review and rating system allowing users to give 0-5 star rating and comments for books. 
- A recommendation system which gives recommendations based on user's read history, rating of books and reading history of other similar users.
- Leaderboard, for the number of books read in the past week. 
- Client side features like profile, change password etc. 
- Dark theme!
- Admin side management system with option to divide different sections of the library accross multiple admins.
- Feature to add new books to the library. 
- Report generation. 
- Checkout and return kiosk feature. 

# Setup guide : 
- Install MySQL and create a database.
- In /server/ create a .env file with the following structure: 
  ```
   # .env
  env=development
  HOST_URL=http://localhost:9000
  DB_USER=<DATABASE_USERNAME>
  DB_PASSWORD=<PASSWORD_OF_DB_USER>
  DB_HOST=<HOST_NAME> localhost if db on your local system
  DB_NAME=<DATABASE_NAME>
  JWT_SECRET=<JWT_PRIVATE_KEY> can be a random string of sufficient length
  MAIL_USER=<MAIL_ID_TO_SEND_EMAILS>
  MAIL_PASSWORD=<PASSWORD_OF_MAIL_ACCOUNT>
  ```
- Run the following scripts: 
  ```
  npm run get-started
  npm run setup-db
  ```
- To run the server use the command: 
  ```
  npm run server
  ```
- To run the client run the command: 
  ```
  npm run client
  ```
- To run both server and client run the command:
  ```
   npm run dev
  ```
- To server the react application in production use:
  ```
  npm run build
  ```
# Contributors: 
[Samarth Jain](https://github.com/BOISaMmY)
[Abhipal Sharma]

# Further development and known issues:
- Better and scalable system for giving recommendations. 
- Optimizing view for smaller screens.
  
