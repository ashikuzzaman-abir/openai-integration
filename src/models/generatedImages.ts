import { randomUUID } from "crypto";
import mongoose , {  Model, Schema, Types } from "mongoose";

export interface GeneratedImageProps {
  name?: string;
  url: string;
  size: number;
  prompt: string;
  createdFor?: Types.ObjectId;
  uuid: string;
}

const generatedImageSchema = new Schema<GeneratedImageProps>({
	name: {
		type: String,
		required: false,
	},
	url: {
		type: String,
		required: true,
	},
	size: {
		type: Number,
		required: true,
	},
	prompt: {
		type: String,
		required: true,
	},
	createdFor: {
		type: Schema.Types.ObjectId,
    ref: "User",
		required: false,
	},
	uuid: {
    type: String,
    default: randomUUID(),
  },
}, {
  timestamps: true,
});


const GeneratedImageModel = mongoose.model("GeneratedImage", generatedImageSchema);

export default GeneratedImageModel;