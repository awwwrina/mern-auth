const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
class UserController {
	async register(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Данные не валидны", errors.array()))}
			const {name, email, password, birthDate, gender, avatar} = req.body;
			const userData  = await userService.register(name, email, password, birthDate, gender, avatar);
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly:true});
			return res.json(userData)
		} catch (error) {
			next(error);
		}
	}
	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(
				email,
				password,
			);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 7 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
	async logout(req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (error) {
			next(error);
		}
	}
	async refresh(req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			const userData = await userService.refresh(
				refreshToken
			);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 7 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers();
            return res.json(users)
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController();
