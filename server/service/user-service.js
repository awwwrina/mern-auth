const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const tokenService = require("../service/token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
	async register(name, email, password, birthDate, gender, avatar) {
		const user = await UserModel.findOne({ email });
		if (user) {
			throw ApiError.BadRequest(`Почта ${email} уже зарегистрирована`);
		}
		const hash = await bcrypt.hash(password, 10);
		const newUser = await UserModel.create({
			name,
			email,
			password: hash,
			birthDate,
			gender,
			avatar,
		});
		const userDto = new UserDto(newUser);
		const tokens = await tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(tokens.refreshToken, userDto.id);

		return {
			...tokens,
			user: userDto,
		};
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw ApiError.BadRequest(`Почта ${email} не зарегистрирована`);
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw ApiError.BadRequest(`Неверный пароль`);
		}
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(tokens.refreshToken, userDto.id);
		return {
			...tokens,
			user: userDto,
		};
	}
	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}
	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDB = await tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDB) {
			throw ApiError.UnauthorizedError();
		}
		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(tokens.refreshToken, userDto.id);
		return {
			...tokens,
			user: userDto,
		};
	}
	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}
}
module.exports = new UserService();
