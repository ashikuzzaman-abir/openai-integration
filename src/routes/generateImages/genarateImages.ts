import ImageGeneration from "../../services/openai/imageGenaration";

const route = require("express").Router();

const { Request, Response } = require("express");

route.post("/", async (req: typeof Request, res: typeof Response) => {
	try {
		const prompt: string = req.body.prompt;

		const generateImage = new ImageGeneration();
		const generatedImgURL: string = await generateImage.genImg(prompt);
		if (!prompt || prompt === "" || !generatedImgURL)
			return res.status(400).json({ status: 400, message: "Bad Request" });

		return res.status(200).json({
			status: 200,
			doc: {
				prompt: prompt,
				url: generatedImgURL,
				size: Number(generateImage.size.split("x")[0]),
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 500,
			message: "Internal Server Error",
		});
	}
});

export default route;
