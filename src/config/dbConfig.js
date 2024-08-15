const mongoose=require('mongoose');
const {Mongo_URL}=require('./dotenvConfig')
const connect = async () => {
    try {
        await mongoose.connect(Mongo_URL);
        console.log('db connection successful');
    } catch (error) {
        console.error('Unable to connect with DB:', error);
    }
};

module.exports={connect}