module.exports = {
  secret: process.env.SECRET_KEY,
  jwtExpiration: 3600, // 1 hour
  jwtRefreshExpiration: 86400, // 24 hours
};
