const redis=require("ioredis");
const ioredis=require("ioredis")
const client=redis.createClient()

// const client=new redis(redisclient)
client.on("connect", async()=>{
    console.log("connected to redis")
})
client.on("err", async()=>{
    console.log(err.message)
})

module.exports={client}

// host:"redis-15181.c212.ap-south-1-1.ec2.cloud.redislabs.com",
// port:15181,
// username:"default",
// password:"BvQGcdHsWtGlSiWvfv5OINumwpaHW1yj"