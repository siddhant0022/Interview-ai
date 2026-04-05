const {createClient} = require('redis');

const client = createClient({
    username: 'default',
    password: 'E91t5uXMxKvyLifh4tQCzmfruwhOivIj',
    socket: {
        host: 'redis-16647.crce217.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 16647
    }
});

client.on('error', err => console.log('Redis Client Error', err));



module.exports = client;
