import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    website: { type: String, required: true, trim: true },
    services: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
export default Form;
