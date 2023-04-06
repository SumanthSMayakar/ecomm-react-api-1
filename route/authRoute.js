const router = require('express').Router()
const authController = require('../controller/authController')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

router.post(`/auth/register`, authController.register)
router.post(`/auth/login`, authController.login)

router.get(`/auth/logout`, authController.logout)
router.get(`/auth/authToken`, authController.authToken)

router.post(`/auth/password/reset`, authController.resetPass)

router.get(`/auth/currentUser`, auth, authController.currentUser)

router.patch(`/auth/addToCart`, auth, authController.addToCart)

router.get(`/auth/all/users`, auth, adminAuth, authController.allUsers)

module.exports = router