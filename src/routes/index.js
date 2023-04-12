const router = require('express').Router();
const loginRouter = require('./login.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const blogPostRouter = require('./blogPost.router');

router.use('/login', loginRouter);
router.use(userRouter);
router.use(categoryRouter);
router.use(blogPostRouter);

module.exports = router;