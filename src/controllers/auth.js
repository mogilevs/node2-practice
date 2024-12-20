import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
import { loginUser, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in a user',
    data: { accessToken: session.accessToken },
  });
};
