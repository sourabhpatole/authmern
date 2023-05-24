const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
    trim: true,
  },
  email: {
    type: "String",
    required: true,
  },
  lastLogins: {
    type: "string",
    default: new Date(),
  },
});
// const generateUserLoginHistory = async function () {
//   const date = new Date();
//   this.lastLogins = this.lastLogins.concat({
//     lastLogin: date,
//   });
//   // console.log(date);
//   await this.save();

//   return this.lastLogins;
// };
const loginHistory = new mongoose.model("LoginHistory", loginSchema);
module.exports = loginHistory;
