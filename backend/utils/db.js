import mongoose from 'mongoose';

export const connect = async () => {
    const uri = 'mongodb+srv://25100148:AuctionApp@cluster0.frmflxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Directly insert the MongoDB URI here
    //    const uri = 'mongodb+srv://25100148:APexam123@cluster0.expyh5q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};


process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose default connection is disconnected due to application termination');
    process.exit(0);
});
