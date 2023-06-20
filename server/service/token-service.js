const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");
class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
			expiresIn: "15m",
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
			expiresIn: "7d",
		});
		return { accessToken, refreshToken };
	}
	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
			return userData;
		} catch (e) {
			return null;
		}
	}
	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
			return userData;
		} catch (e) {
			return null;
		}
	}
	async saveToken(refreshToken, userId) {
		const tokenData = await tokenModel.findOne({ userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await tokenModel.create({ refreshToken, userId });
		return token;
	}
	async removeToken(refreshToken) {
		const token = await tokenModel.deleteOne({ refreshToken });
		return token;
	}
	async findToken(refreshToken) {
		const token = await tokenModel.findOne({ refreshToken });
		return token;
	}
}
module.exports = new TokenService();
