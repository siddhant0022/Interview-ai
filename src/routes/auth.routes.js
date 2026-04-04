const {Router} = require('express');
const authController = require('../controller/auth.controller');

const authRouter = Router();

authRouter.post('/register', authController.registerUserController);

authRouter.post('/login', authController.LoginUserController);

authRouter.post('/logout', authController.LogoutUserController);

module.exports = authRouter;