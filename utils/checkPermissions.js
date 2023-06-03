import { UnauthenticatedError } from '../errors/index.js';

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnauthenticatedError('You do not have permission to perform this action');
};

export default checkPermissions;
