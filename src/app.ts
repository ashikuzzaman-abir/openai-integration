
require("dotenv").config();





import generateImagesRoute from "./routes/generateImages/genarateImages";
import userRoute from "./routes/user/user";

import { davinci3pm } from './middlewares/limiters/davinci.limiter';




import helmet from "helmet";
import connectDB from "./services/mongodb/connectDB";
import authorize from "./middlewares/auth/authorize";
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");






const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

connectDB();



app.use("/generateImages", davinci3pm, authorize, generateImagesRoute);
app.use("/user",  userRoute);


app.listen(PORT, () => {
	console.log(`Openheimer listening @ ${PORT}`);
});



