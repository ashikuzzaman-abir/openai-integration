import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});



export default openai;

