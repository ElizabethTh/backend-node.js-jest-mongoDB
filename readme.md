Steps to follow:

1. Run npm install to install all the packages needed for this application.
2. Install mongoDB
2. Run npm start to run the application on the local.
3. Run npm test to run the testcases. 


API Documentation

<!-- sign Up and SignIn : users.js/routes -->
1. SignUp user

/users
 input: {email: email address, password: password}

2. SignIn user

 /users/signin
 input: {email: email address, password: password}

<!-- CRUD tweet : tweets.js/routes -->

 3. Create tweet

 /tweets
 input: {  username: username,tweet: tweet,image: image, timeStamp: timeStamp (date format)}

4. Read Tweet

/tweets/read
input: {username: username}

5. Update Tweet

/tweets/update
 input: {tweet: tweet, userId:userId}

6. Delete Tweet

/tweets/delete
 input: {userId:userId}