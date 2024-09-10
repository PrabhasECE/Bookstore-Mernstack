import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app =express();

// DONT FORGET THE BELOW ORDER.
/*
CORS Middleware: Apply the CORS middleware at the beginning to handle Cross-Origin Resource Sharing. This ensures that CORS headers are set correctly for all routes.

Body Parsing Middleware: Use app.use(express.json()) or any other body parsing middleware to parse incoming request data, such as JSON data. Place this after the CORS middleware.

Route Handlers: Define your route handlers and use app.use() to associate them with specific routes or route prefixes. These should come after the CORS and body parsing middleware.

By following this order, you can effectively manage CORS and ensure that your Express application processes requests correctly.
*/


// CORS is important in web development
// middleware for handling CORS POLICY
// option1: Allow all origins with default of cors(*)
//app.use(cors());
// option2: Allow custom origins
//app.use(cors());

app.use(cors({
    //origin: 'http://localhost:5173',
    origin: "https://mernstack-bookstore.netlify.app",
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
   // allowedHeaders: ['Content-Type']  ,
  })
);
/*
app.get("/", (request,response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});
*/
app.use(express.json());


app.use('/books', booksRoutes);



mongoose
    .connect(mongoDBURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('App connected to database.');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })