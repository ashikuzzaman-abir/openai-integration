import { type } from "os";
import openai from "./openai";


export type size = "512x512" | "1024x1024" | "256x256";

class ImageGenaration {
	size: size;
	constructor(size: size = "256x256") {
		this.size = size;
	}

	async genImg(prompt: string, n: number = 1): Promise<string> {
		const response = await openai.images.generate({
			prompt: prompt,
			n: n,
			size: this.size,
		});
		const image_url: any = response.data[0].url;
		return image_url;
	}
}

export default ImageGenaration;
