const {router} = require('express');
const authController = require('../controller/auth.contrroller');

const authRouter = router();

authRouter.post('/register', authController.registerUserController);

module.exports = authRouter;