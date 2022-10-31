const express = require('express')
const app = express()
const dotenv = require('dotenv')
const userRouter = require('./src/routes/user')
const authRouter = require('./src/routes/auth')
const purchaseRouter = require('./src/routes/purchase')
const projectRouter = require('./src/routes/project')
const auth = require("./src/middleware/auth");

dotenv.config();

const PORT = process.env.PORT || '3000'

/**
 * Middleware
 */
app.use(express.json())
app.use(express.urlencoded({extended:false}))

/**
 * Routes
 */
app.use('', authRouter)
app.use('/purchase', purchaseRouter)
app.use('/project', projectRouter)
app.use('/user', userRouter)

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
  });

/**
 * Start listening
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})