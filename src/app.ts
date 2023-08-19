require("dotenv").config();




import generateImagesRoute from "./routes/generateImages/genarateImages";




import helmet from "helmet";
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




app.use("/generateImages", generateImagesRoute);


app.listen(PORT, () => {
	console.log(`Openheimer listening @ ${PORT}`);
});


export default app;