const jwt = require('jsonwebtoken');
module.exports = {
  generateJWT: async ({
    payload,
    secretKey = process.env.JWT_ACCESS_TOKEN_SECRET,
    signOption = { expiresIn: process.env.JWT_EXPIRE_IN || '30m'}
  }) => {
    try {
      const token = `${jwt.sign(payload, secretKey, signOption)}`;
      return token;
    } catch (error) {
      console.log('jwt token generate error ', error);
      return null;
    }
  },

  generateRefreshToken: async ({
    payload,
    secretKey = process.env.JWT_REFRESH_TOKEN_SECRET,
    signOption = { expiresIn: '7d' } // Refresh token expires in 7 days
  }) => {
    try {
      const refreshToken = jwt.sign(payload, secretKey, signOption);
      return refreshToken;
    } catch (error) {
      console.log('jwt refresh token generate error ', error);
      return null;
    }
  },

  verifyJWT: (
    token,
    secretKey = process.env.JWT_ACCESS_TOKEN_SECRET,
    signOption = { expiresIn: process.env.JWT_EXPIRE_IN }
  ) => {
    try {
      const data = jwt.verify(token, secretKey, signOption);
      return data;
    } catch (error) {
      console.log('jwt token decode error ', error);
      return null;
    }
  }
};
