
import mongoose from "npm:mongoose";

const personSchema = new mongoose.Schema({
  name:   String,
  number: String,
});

// https://mongoosejs.com/docs/api/document.html#Document.prototype.toObject()
// Note that this is using "toJSON", which only modifies the output that JSON.stringify produces.
// To modify the object at creation itself, use the parameter "toObject".

// the option "versionKey" can be used to disable the addition of key "__v"
// versionKey: false,

personSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export { personSchema };