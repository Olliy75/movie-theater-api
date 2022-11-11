const express = require("express");
const app = express();
const db = require("./db/db");
const { body, validationResult } = require("express-validator");
const seed = require("./db/seed")
const userRouter = require('./routes/users');
const showRouter = require('./routes/shows');

app.use(express.json());

app.use('/users', userRouter)
app.use('/shows', showRouter)



app.listen(3000, async () => {
    await seed(); // call seed() when starting the server
    console.log("Listening on port 3000");
});


module.exports = app;