const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// const YearSchema = new mongoose.Schema({
//   months: {
//     type: Map,
//     of: MonthSchema
//   }
// });

// const MonthSchema = new mongoose.Schema({
//   month: {
//     type: [DaySchema],
//     default: []
//   }
// });

// const DaySchema = new mongoose.Schema({
//   date: {
//     type: Date
//   },
//   colorData: [Number]
// });

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  moodData: {
    type: [mongoose.SchemaTypes.Mixed],
    default: []
  }
});
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);