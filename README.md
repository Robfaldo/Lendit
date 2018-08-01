# Lendit

## About

A sharing platform to lend and borrow items. Users can borrow items using a karma point system - You gain karma by lending out your items, and it costs you Karma to borrow items.
The application is deployed on [heroku](https://limitless-wildwood-27577.herokuapp.com).

## How to Use

**1. Install node (if haven't already got it!)**
```
$ brew install node
```
**2. Download the repository**
```
$ git clone git@github.com:khiebiggs/Lendit.git
$ cd Lendit
```
**3. Install dependencies of both the client, and the server**
```
$ npm install
$ cd client
$ npm install
```
**4. Create an account on [mlab](https://mlab.com/), and create a blank database**
**5. Create a user and password for the database
**6. Create a file called set_env_variables.sh, and fill it with this:**
```
export DB_Password=[insert database password here]
export DB_USERNAME=[insert database username here]
export DB_ENV=development
export AWS_USER_KEY=[insert AWS user key here]
export AWS_USER_SECRET=[insert AWS user secret here]
export AWS_BUCKET_NAME=[inset AWS bucket name here]

```


You cannot build the application without the appropriate credentials for 
the database, which is hosted on mlab. Please contact us if you are interested in running the app on your local device!
