import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];

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
