const express = require("express");
// eslint-disable-next-line
const router = express.Router();
const { auth, owner } = require('../auth');

const controller = require("./controller");

/**
 * /api/v1/tasks       POST    Create
 * /api/v1/tasks       GET     Read all
 * /api/v1/tasks/:id   GET     Read
 * /api/v1/tasks/:id   PUT     Update
 * /api/v1/tasks/:id   DELETE  Delete
 *
 */

router.route("/").get(controller.all).post(auth, controller.create);

router.param('id', controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(auth, owner, controller.update)
  .patch(auth, owner, controller.update)
  .delete(auth, owner, controller.delete);

module.exports = router;
