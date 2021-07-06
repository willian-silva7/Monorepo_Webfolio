const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
  blockDuration: 5,
});

const rateLimiterMiddleware = async (request, response, next) => {
  await rateLimiter
    .consume(request.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      response.status(429).json('Muitas Requisições');
    });
};

module.exports = rateLimiterMiddleware;
