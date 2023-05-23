const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const tokenService = require("../service/token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require('../exceptions/api-error')

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
}
module.exports = new UserService();
