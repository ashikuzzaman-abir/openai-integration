const rateLimiter = require("express-rate-limit");


export const davinci3pm = rateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders:false,
  message: "Too many request, please try again later",
});


