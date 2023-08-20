const { Response, Request, Next } = require("express");
import jwt from "jsonwebtoken";
export default async function (req: typeof Response , res: typeof Request, next: typeof Next) {

  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ status: 401, message: "Unauthorized" });
  try {
    const decoded = await jwt.verify(token, process.env.SECRET!);
    if (!decoded) return res.status(401).json({ status: 401, message: "Unauthorized" });
			req.user = decoded;
			next();
		} catch (err) {
			console.log(err);
			res.status(500).json({ status: 500, message: "Internal Server Error" });
		}
}