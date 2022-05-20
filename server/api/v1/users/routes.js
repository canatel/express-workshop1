const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const controller = require('./controller');
const { auth, me } = require('../auth');

//router.route('/').get(controller.all).post(controller.create);

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .patch(auth, me,controller.update)
  .put(auth, me,controller.update)
  .delete(auth, me,controller.delete);

module.exports = router;