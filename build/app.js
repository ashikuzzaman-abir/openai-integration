"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// const openAi = require("./services/openai/openai");
app.listen(PORT, () => {
    console.log(`Openheimer listening @ ${PORT}`);
});
