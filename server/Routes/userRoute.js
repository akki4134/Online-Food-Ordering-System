import express from 'express'
import userController from '../Controllers/userController.js'

const AuthRoute = express.Router();

// AuthRoute.post("/login", userController.login)
AuthRoute.post("/register", userController().postregister)
AuthRoute.get("/users", userController().getallusers)


export default AuthRoute
