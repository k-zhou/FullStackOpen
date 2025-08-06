
import mongoose from "npm:mongoose";

const personSchema = new mongoose.Schema({
  name:   {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => { return /(?=.{8,})0\d{1,2}-\d{5,}/.test(v); },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
});

// lookahead (?=  )
// wildcard .
// quantifier {m,n} where m is minimum count and n maximum count; can use {m, }
// \d digit, equivalent to [0-9]

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