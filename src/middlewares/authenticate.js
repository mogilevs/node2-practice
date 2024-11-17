import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return next(
      createHttpError(401, 'Authorization header should be type Bearer'),
    );
  }
  const session = await SessionsCollection.findOne({ accessToken: token });
  if (!session) {
    return next(createHttpError(401, 'Session is not found'));
  }

  const isTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
  if (isTokenExpired) {
    return next(createHttpError(401, 'Token is expired'));
  }
  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    return next(createHttpError(401));
  }
  req.user = user;
  next();
};
