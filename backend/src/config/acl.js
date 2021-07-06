const config = {
  baseUrl: '/',
  filename: 'nacl.json',
  roleSearchPath: 'role.user',
  path: 'backend/',
};

module.exports = config;

const responseObject = {
  status: 'Access Denied',
  message: 'You are not authorized to access this resource',
};

module.exports = responseObject;
