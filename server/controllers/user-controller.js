const userService = require('../service/user-service');
class UserController {
	async register(req, res, next) {
		try {
			const {name, email, password, birthDate, gender, avatar} = req.body;
			const userData  = await userService.register(name, email, password, birthDate, gender, avatar);
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly:true, secure: true});
			return res.json(userData)
		} catch (error) {
			next(error);
		}
	}
	async login(req, res, next) {
		try {
		} catch (error) {
			next(error);
		}
	}
	async logout(req, res, next) {
		try {
		} catch (error) {
			next(error);
		}
	}
	async refresh(req, res, next) {
		try {
		} catch (error) {
			next(error);
		}
	}
	async getUsers(req, res, next) {
		try {
            res.json(['123', '456', '789'])
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController();
