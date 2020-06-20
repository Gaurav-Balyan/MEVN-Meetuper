module.exports = {
  DB_URI:
    "mongodb+srv://gbalyan:balyan@cluster0-wjwz8.mongodb.net/meetuper?retryWrites=true&w=majority",
  SESSION_SECRET: "abcdef",
  JWT_SECRET: "mnopqr",
  GOOGLE_USER: "mail.gaurav.balyan@gmail.com",
  GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
  DOMAIN: process.env.DOMAIN
};
