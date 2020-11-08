"use strict";

const nodemailer = require("nodemailer");
require('dotenv').config();

// async..await is not allowed in global scope, must use a wrapper
async function main() {
// try{



      // fill infromation from env variables
      const emailHost = process.env.EmailHOST || "";
      const emailPort = process.env.EmailPort || "";
      const emailSecure = process.env.Emailsecure || true;
      const emailUser = process.env.EmailUser || "";
      const emailPass = process.env.EmailPass || "";

      console.log(`${new Date()}, email configurations : 
                   emailHost : ${emailHost} \n
                   emailPort : ${emailPort} \n
                   emailSecure: ${emailSecure} \n
                   emailUser : ${emailUser} \n
                   emailPass : ${emailPass}`);
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: true, // true for 465, false for other ports
        auth: {
          user: emailUser,
          pass: emailPass
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: emailUser,
        to: "eng.massoud@hotmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 //   }
  // catch(err)
  //   {
  //      console.error(`${new Date()} \n ERROR DETIALS : ${err}`);
  //   }
}

main().catch(console.error);
