const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = Router();
const { body } = require("express-validator");

router.post(
	"/register",
	body("email").isEmail(),
	body("password").isLength({ min: 4, max: 32 }),
	userController.register
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);

module.exports = router;
