import mongoose, { ConnectOptions, Connection } from "mongoose";

const url= process.env.MONGO_URL;
const connectDB = async () => {
	try {
    if(!url) console.log("no mongo url")
		const conn = await mongoose.connect(url!, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		} as ConnectOptions);
		console.log(`Mongo DB connected: ${conn.connection.host}`);
	} catch (error:any) {
		console.log(`error: ${error?.message}`);
		process.exit(1);
	}
};
export default connectDB;
