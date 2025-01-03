const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
require("dotenv").config();


module.exports.GeneratePassword = async (password) => {
  return await bcrypt.hash(password, 8);
};

module.exports.ValidatePassword = async (enteredPassword, savedPassword) => {
  let isPasswordMatch = await bcrypt.compare(enteredPassword, savedPassword);
  return isPasswordMatch;
};

module.exports.GenerateSignature = (payload) => {
  try {
    return jwt.sign(payload, "secretKey", { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = jwt.verify(signature.split(" ")[1], "secretKey");
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};


module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(process.env.MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    //do not create exchanges on the cloud. this code nor will create it once connected
    await channel.assertExchange(process.env.EXCHANGE_NAME, "direct", {
      durable: true,
    });
    return channel;
  } catch (err) {
    throw err;
  }
};

module.exports.PublishMessage = (channel, bindingKey, msg) => {
  try {
    channel.publish(process.env.EXCHANGE_NAME, bindingKey, Buffer.from(msg));
    console.log('MESSAGE PUBLISHED ')
    console.log("Sent: ", msg);
  } catch (err) {
    throw err;
  }
};

module.exports.SubscribeMessage = async (channel, service) => {
  const appQueue = await channel.assertQueue(process.env.QUEUE_NAME, {
    durable: true,
  });
  channel.bindQueue(appQueue.queue, process.env.EXCHANGE_NAME, process.env.PRODUCT_BINDING_KEY);
  channel.consume(appQueue.queue, (data) => {
    console.log('raw data from subscribe message from products',data)
    console.log('dataaa from product service',data.content.toString())
    service.SubscribeEvents(data.content.toString())
    
    channel.ack(data);
    
  });

};
