[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/G9ySB-gs)
# PA3 - MERN

This assignment is due on **11:55 PM on April 19th, 2024 (Friday)**.

For this assignment, you will be coding one of the following 2 apps:

1. Auction App
2. Trading App

Each student has been assigned one of the 2 apps that they have to code. The distribution is provided in the Excel files in the repository.

For this assignment, you will be coding an entire MERN application from scratch.

Firstly, you may create the boiler for a MERN stack application with JavaScript for the backend and TypeScript for the frontend (we have already provided some starter code - however, you can also create your own if you want to). This has already been covered in class as well. You can also use other methods to create your boiler code. One such example for the frontend is Vite. You can read more about it [here](https://vitejs.dev/guide/).

Since the course is not meant to teach you the styling of a web page, a very bare-bones design guide with the `html` and `css` for the different pages and components in the frontend have been provided in the `Design` folder. You are responsible for splitting them into components for use in your app. These should be enough. However, if you want to add your own styling and/or components, feel free to do so. For those of you more experienced in web dev, feel free to use Tailwind CSS if you want to make any edits.

**Note:** Any `css` styling put in `index.css` in the React setup is global and applies across the app, so you may need to change some CSS class names in order to avoid clashes.

# Set Up

In the boiler code provided to you, there are separate folders for backend and frontend. You are required to run `npm i` once in the `backend` folder. On the other hand, you can use either Vite or Create-react-App to set up the frontend in the `frontend` folder.

## Backend

This folder consists of `server.js`, `app.js` and a folder structure.

`app.js` consists of an instance of an express server and will be where you will setup the middleware and routes on the Express instance.

`server.js` generates an instance of an HTTP server using the express object and creates a socket as well as an HTTP requests listener.

The folder structure consists of the following:

- controllers: will contain any and all functions used to handle an HTTP request.
- models: will contain all the mongoose database schemas you will declare for your app.
- routes: will contain the logic for all your routes.
- utils: any helper functions you might want to declare.

Upon running the command `npm run dev` in the `backend` folder, you will start a server on port number 8000 that shall listen and cater to all HTTP requests and socket connections. Any sockets or HTTP requests that you will use in the frontend should connect to `localhost:8000`.

The `server.js` file consists of an io object that listens to certain socket events using the [socket.io](https://socket.io) library. You have been provided with a listener for the `connection` event that is emitted by all clients when they open up a socket to this server (client-side code provided in lectures). Hence, given the initial implementation, upon every user connecting, you will be able to view "USER CONNECTED" on the server-side console. In your implementation, you can edit and add listeners of any type to suit your program. You can review various options from the official [socket.io](https://socket.io) documentation.

## Frontend

You can set up the frontend however you like. Vite is recommended due to its significantly faster development server and better hot-reloading experience. However, if you would like to go with `create-react-app`, that is fine as well.

## A Slight Catch with Sockets

Everytime a user reloads a page, that alone causes the socket on the client’s end to emit a ‘disconnect’ event and create a new socket. This causes it to emit a ‘connection’ event again with a different socket-id on the server’s end. While you may want to just let this pass by imagining that the refresh button does not exist, it would be convenient if you cater to this. There can be multiple ways to cater to this. One of them being that upon every new connection, the server assigns a unique client id and emits it back to the client. At the same time the server maintains a map of each unique client id against the socket id. In case that an already existing client id emits an event with a different socket id, a page refresh can be detected. On the client’s end, you would have to accordingly ensure that once assigned with an ID, it cannot be overwritten in the future by the server.

# Auction App

The Auction app will serve as a platform where any user can put an item up for auction. Other users will be able to bid on the item and by the end of the auction, the user with the highest bid will obtain the item.

The Auction app will consist of the following pages:

- Login
- Sign Up
- Home
- Browse
- My Profile
- Create Auction
- Change Password
- Specific Auction

A Navbar will be shown on top of each page except Login and Sign Up. The design for all screens and the Navbar is provided in the design guide.
The user will land on the Sign Up page when they open the app and should not be able to proceed without signing up or logging in.

### Sign Up

All users will need to sign up for the application with a unique username and password. The details need to be stored in MongoDB using Mongoose.
The username should be unique, and the user should be prompted to re-enter it if it is not.

### Login

The user should be able to log in using their username and password.

### Home

This will be the landing page of the website after logging in or signing up.

### Browse

This page will contain a list of all the **ongoing** auctions.
The user should be able to:

- Filter through them by searching for keywords in the title using the search bar.
- Click on an auction which would navigate them to the Specific Auction page.

### My Profile

This page will show all the details of a user which include:

- Name
- Username
- List of auctions they created
- Number of items owned (update when they win an auction)

Additionally they should also have an option to create a new auction as well as change their password. Both these options will navigate to the Create Auction and Change Password pages respectively.

### Create Auction

This page will allow the user to create an auction with the following details:

- Title
- Description
- Starting Price
- Starting Time
- Ending Time

The auction will also have an additional field of **Current Price** which will be updated as users bid on the item.
Details should be stored in MongoDB using Mongoose.

### Change Password

This page will be used to update a user's password stored in MongoDB.

### Specific Auction

This page will be opened when the user clicks on an auction on the Browse page. It will contain all the details of the auction. These include:

- title
- description
- starting price
- the current going price
- starting time
- ending time

Users should be able to place bids in real-time, which will be shown to any and all users that have opened this page. This will use sockets.

**Note:**

- **A user should not be able to bid an amount lower than the current going price**
- **The user who posted the auction cannot bid on it.**
- **The auction should end for all connected users at the prescribed time.**

Hints:

- You'll need to open a socket with the server when you navigate to this page and broadcast to any user connected to the same socket.
- Check out the [socket.io](https://socket.io) documentation on how to create rooms.

## Details to Store in MongoDB

This is only a general overview of the data you will need to store. You can add more fields and arrange the models as you see fit.

-  User
	- Username
	- Password
 	- No. of items owned
	- List of their created auctions (reference to the Auction model)
- Auction
	- Title
	- Description
	- Starting Price
	- Starting Time
	- Ending Time
	- Current Price (this will also serve as the sold price after the ending time of the auction)

# Trading App

The Trading app will serve as a platform where users can trade items with other users. Any user can post a trade and any other user can send offers for that trade. The offer may contain an equivalent value of cash and/or item/s.

The Trading app will consist of the following pages:

- Login
- Sign Up
- Home
- Browse
- My Profile
- Create Trade
- Create Offer
- Change Password
- Specific Trade

A Navbar will be shown on top of each page except Login and Sign Up.

### Sign Up

All users will need to sign up for the application with a unique username and password. The details need to be stored in MongoDB using Mongoose.
The username should be unique, and the user should be prompted to re-enter it if it is not.

### Login

The user should be able to log in using their username and password.

### Home

This will be the landing page of the website after logging in or signing up.

### Browse

This page will contain a list of all the **ongoing** trades.
The user should be able to:

- Filter through them by searching for keywords in the title using the search bar.
- Click on an auction which would navigate them to the Specific Trade page.

### My Profile

This page will show all the details of a user which include:

- Name
- Username
- List of trades they created
- List of trade offers they sent

Additionally they should also have an option to create a new trade as well as change their password. Both these options will navigate to the Create Auction and Change Password pages respectively.

### Create Trade

This page will allow the user to create a trade with the following details:

- Title
- Description
- List of Conditions (array os strings)

The auction will also have an additional field of **Accepted Trade** which will be updated when the user who posted the trade accepts an offer.
Details should be stored in MongoDB using Mongoose.

### Change Password

This page will be used to update a user's password stored in MongoDB.

### Specific Trade

This page will be opened when the user clicks on a trade on the Browse page. It will contain all the details of the trade (i.e., title, description, and conditions), and 

Users should be able to offer trades in real-time. There are 2 possible outputs of this screen:

1. The user who created the trade will see all offers coming in real-time. These offers will have the details as well as the Accept and Reject options. Upon accepting an offer, the trade should end for all connected users.
2. Any other user will have the option to send an offer.

This will use sockets.

Hints:

- You'll need to open a socket with the server when you navigate to this page and broadcast to any user connected to the same socket.
- Check out the socket.io documentation on how to create rooms.

## Details to Store in MongoDB

This is only a general overview of the data you will need to store. You can add more fields and arrange the models as you see fit.

- User
	- Username
	- Password
 	- No. of items owned
	- List of their created trades (reference to the Trade model)
- Trade
	- Title
	- Description
	- List of conditions (array of Strings)
    - List of offers (array of references to the Offer model)
    - Accepted Offer (reference to the Offer model)
- Offer
    - User who sent the offer
    - List of items offered
    - Cash offered
    - Trade offered for (reference to the Trade model)

# Final Remarks

- All the currency, items, and images used in this assignment are placeholders to simulate the functionality since the aim is to familiarise you with the workings of the MERN stack instead of making the app itself.
- Feel free to completely overhaul the frontend if you want to.

-----------------------------------------------------------------------------
And as always, **Start Early** and **Happy Coding**!
