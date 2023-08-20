import ImageGeneration from "../../services/openai/imageGenaration";

const route = require("express").Router();
import imageModel, { GeneratedImageProps } from "../../models/generatedImages";

const { Request, Response } = require("express");

route.post("/", async (req: typeof Request, res: typeof Response) => {
	try {
		const prompt: string = req.body.prompt;
		const userId = req.user._Id;

		if (!prompt || prompt === "" )
			return res.status(400).json({ status: 400, message: "Bad Request" });
		const presentImage= await imageModel.findOne({prompt: prompt});
		if(presentImage){
			return res.status(200).json({
				status: 200,
				catched: true,
				doc: {
					prompt: prompt,
					url: presentImage.url,
					size: Number(presentImage.size),
					createdFor: presentImage.createdFor,
				},
			});
		}

		const generateImage = new ImageGeneration();
		const generatedImgURL: string = await generateImage.genImg(prompt);
		const image = new imageModel({
			prompt: prompt,
			url: generatedImgURL,
			size: Number(generateImage.size.split("x")[0]),
		} as GeneratedImageProps);
		await image.save();
		
		return res.status(200).json({
			status: 200,
			doc: {
				prompt: prompt,
				url: generatedImgURL,
				size: Number(generateImage.size.split("x")[0]),
				createdFor: userId,
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
