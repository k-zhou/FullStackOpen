
import mongoose from "npm:mongoose";

export const noteSchema = new mongoose.Schema({
  content:   String,
  important: Boolean,
});