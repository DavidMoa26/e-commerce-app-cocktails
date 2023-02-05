import mongoose from 'mongoose';

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.DATABASE, {
            useUnifiedTopology: true
        });
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectDB