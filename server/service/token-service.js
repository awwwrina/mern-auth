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
    async saveToken(refreshToken, userId) {
        const tokenData = await tokenModel.findOne({ userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ refreshToken, userId });
        return token;
    }

}
module.exports = new TokenService();
