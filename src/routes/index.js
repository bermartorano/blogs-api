const router = require('express').Router();
const loginRouter = require('./login.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');

router.use('/login', loginRouter);
router.use(userRouter);
router.use(categoryRouter);

module.exports = router;