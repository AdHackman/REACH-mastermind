const express = require('express'); //loading the express library
const path = require('path'); // Node.js built-in module for handling file paths

const app = express(); //creating an express server
const port = process.env.PORT || 3000; //setting the port to 3000

app.use(express.static('public')); //serving static files from the public folder
app.use(express.json())



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });