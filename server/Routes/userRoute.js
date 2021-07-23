import express from 'express'
import userController from '../Controllers/userController'

const router = express.Router

router.post("/login", userController.login)
router.post("/register", userController.register)
router.get("/getallusers", userController.getallusers)

    
module.exports = router;