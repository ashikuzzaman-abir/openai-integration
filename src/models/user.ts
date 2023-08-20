import { randomUUID } from "crypto";
import mongoose, { Model, Schema, Types } from "mongoose";

export interface UserProps {
	username: string;
	email: string;
  password: string;
	name?: string;
	phone?: string;
}

const userSchema = new Schema<UserProps>(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
      unique: true,
		},
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
      unique: false,
    },
    password: {
      type: String,
      required: true,
    }
  },
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model(
	"User",
	userSchema
);

export default UserModel;
