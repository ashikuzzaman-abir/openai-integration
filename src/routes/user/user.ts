import UserModel, { UserProps } from "../../models/user";

import jwt from "jsonwebtoken";
const router = require("express").Router();
const { Request, Response } = require("express");
import bcrypt from "bcrypt";

router.post("/signup", async (req: typeof Request, res: typeof Response) => {
	try {
		const { username, name, email, phone, password } = req.body as UserProps;
		const hased = await bcrypt.hash(password, 10);
		const user = new UserModel({
			name: name,
			username: username,
			email: email,
			password: hased,
			phone: phone && phone,
		});
		const userReturn = await user.save();
		const token = jwt.sign(
			{
				_id: userReturn._id,
				name: userReturn.name,
				username: userReturn.username,
				email: userReturn.email,
				phone: userReturn.phone,
			} as any,
			process.env.SECRET!
		);
		res.status(201).json({
			status: 200,
			message: "User Created",
			token,
			doc: {
				_id: userReturn._id,
				name: userReturn.name,
				username: userReturn.username,
				email: userReturn.email,
				phone: userReturn.phone,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 500,
			message: "Internal Server Error",
			error: err
		});
	}
});

export type LoginProps = {
	username: string;
	password: string;
};

router.post("/login", async (req: typeof Request, res: typeof Response) => {
	try {
		const { username, password } = req.body as LoginProps;
		const user = await UserModel.findOne({ username: username });
		if (!user)
			return res.status(404).json({ status: 404, message: "User Not Found" });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(401).json({ status: 401, message: "Unauthorized" });
		const token = jwt.sign(
			{
				_id: user._id,
				name: user.name,
				username: user.username,
				email: user.email,
				phone: user.phone,
			} as any,
			process.env.SECRET!
		);
		res.status(200).json({
			status: 200,
			message: "User Logged In",
			token,
			doc: {
				_id: user._id,
				name: user.name,
				username: user.username,
				email: user.email,
				phone: user.phone,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 500,
			message: "Internal Server Error",
			error: err,
		});
	}
});

export default router;
