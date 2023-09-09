import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  // check header - not being used since a cookie now
  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith('Bearer')) {
  //   throw new UnauthenticatedError('Authentication invalid');
  // }

  // console.log(req.cookies);
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);

    // attach user to request object
    // req.user = payload;
    const testUser = payload.userId === '64fbf05f1c3a099406c8af59';
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

export default auth;
