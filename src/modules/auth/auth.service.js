const bcrypt = require('bcryptjs');
const JwtService = require('../../utils/jwt');
const { getMessage } = require('../../utils/constant');
const User = require('../../db/User');

const AuthService = {
  /**
   * Logs in a user and generates a token.
   */
  doLogin: async (requestBody) => {
    const { email, password } = requestBody;
    let user;

    try {
      // Find user by email or mobile
      user = await User.findOne({ email: email });

      // Check for valid user and password
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return {
          data: null,
          statusCode: 500,
          isError: true,
          message: getMessage('en', 'error', 'invalidCredentials', 'auth'),
          errorStack: null
        };
      }

      // Prepare JWT payload
      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        employeeNumber: user.employeeNumber,
        displayName: user.displayName
      };

      const accessToken = await JwtService.generateJWT({ payload });
      const refreshToken = await JwtService.generateRefreshToken({ payload });

      if (!accessToken || !refreshToken) {
        return {
          data: null,
          statusCode: 500,
          isError: true,
          message: getMessage('en', 'error', 'tokenFail', 'auth'),
          errorStack: null
        };
      }
      return {
        data: { token: accessToken, refreshToken, expireIn: process.env.JWT_EXPIRE_IN },
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'loginSuccess', 'auth'),
        errorStack: null
      };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'loginFailed', 'auth'),
        errorStack: error
      };
    }
  },

  /**
   * Register a new user
   */
  doRegistration: async (requestBody) => {
    try {
      const { email, password, role, firstName, lastName,employeeNumber,displayName } = requestBody;

      const hashedPassword = bcrypt.hashSync(password, 8);

      // Create a new user
      const user = new User({
        email: email?.toLowerCase(),
        role: role?.toLowerCase(),
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        employeeNumber: employeeNumber,
        displayName: displayName
      });
      await user.save();

      return {
        data: user,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'registerSuccess', 'auth'),
        errorStack: null
      };
    } catch (error) {
      console.error('Registration failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'registerFailed', 'auth'),
        errorStack: error
      };
    }
  },

  /**
   * Reset password for a user
   */
  resetPassword: async (requestBody) => {
    try {
      const { email, password } = requestBody;
      const hashedPassword = bcrypt.hashSync(password, 8);

      // Update password in database
      await User.updateOne({ email: email.toLowerCase() }, { password: hashedPassword });

      return {
        data: null,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'error', 'resetSuccess', 'auth'),
        errorStack: null
      };
    } catch (error) {
      console.error('Password reset failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'resetFailed', 'auth'),
        errorStack: error
      };
    }
  },

  /**
   * Logout user
   */
  doLogout: async (requestBody) => {
    try {
      requestBody.session.destroy();
      return {
        data: null,
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'error', 'logoutSuccess', 'auth'),
        errorStack: null
      };
    } catch (error) {
      console.error('Logout failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'logoutFailed', 'auth'),
        errorStack: error
      };
    }
  },

  doOktaLogin: async (email) => {
    let user;
    try {
      // Find user by email or mobile
      user = await User.findOne({ email: email });

      // Check for valid user and password
      if (!user) {
        return {
          data: null,
          statusCode: 500,
          isError: true,
          message: getMessage('en', 'error', 'invalidCredentials', 'auth'),
          errorStack: null
        };
      }

      // Prepare JWT payload
      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        employeeNumber: user.employeeNumber,
        displayName: user.displayName
      };

      const accessToken = await JwtService.generateJWT({ payload });
      const refreshToken = await JwtService.generateRefreshToken({ payload });

      if (!accessToken || !refreshToken) {
        return {
          data: null,
          statusCode: 500,
          isError: true,
          message: getMessage('en', 'error', 'tokenFail', 'auth'),
          errorStack: null
        };
      }
      return {
        data: { token: accessToken, refreshToken, expireIn: process.env.JWT_EXPIRE_IN },
        statusCode: 200,
        isError: false,
        message: getMessage('en', 'success', 'loginSuccess', 'auth'),
        errorStack: null
      };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        data: null,
        statusCode: 500,
        isError: true,
        message: getMessage('en', 'error', 'loginFailed', 'auth'),
        errorStack: error
      };
    }
  },

};

module.exports = AuthService;
