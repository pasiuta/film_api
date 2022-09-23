const redis = require('redis');
const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
redisClient.connect()
redisClient.on('connect', function () {
    console.log('Redis client connected');
});
redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

module.exports = redisClient;