const nodemailer = require("nodemailer");
const config = require("../config");

exports.sendConfirmationEmail = ({ toUser, hash }, callback) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.GOOGLE_USER,
      pass: config.GOOGLE_PASSWORD
    }
  });

  const message = {
    from: config.GOOGLE_USER,
    // to: toUser.email // in production uncomment this
    to: config.TEST_USER,
    subject: "Vue Meetuper - Activate Account",
    html: `
            <h3> Hello ${toUser.name} </h3>
            <p>Thank you for registering into Vue Meetuper. Much Appreciated! Just one last step is laying ahead of you...</p>
            <p>To activate your account please follow this link: <a target="_" href="${
              config.DOMAIN
            }/users/${hash}/activate">${config.DOMAIN}/activate </a></p>
            <p>Cheers</p>
            <p>Your Vue Meetuper Team</p>
          `
  };

  transporter.sendMail(message, function(err, info) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, info);
    }
  });
};
