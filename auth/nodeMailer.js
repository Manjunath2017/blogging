const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const dotenv = require("dotenv").config();

module.exports.transporterAuth = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_KEY
    }
  })
);