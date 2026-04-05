
const { createClient} = require("redis");

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-16647.crce217.ap-south-1-1.ec2.cloud.redislabs.com:16647',
        port: 19072
    }
});

client.on('error', err => console.log('Redis Client Error', err));

module.exports = client;