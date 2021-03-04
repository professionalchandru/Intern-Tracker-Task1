import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 50,
    required: true,
  },
  email: {
    type: String,
    min: 3,
    max: 50,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    min: 50,
    max: 250,
    required: true,
  },
  college: {
    type: String,
    min: 3,
    max: 50,
    required: true,
  },
  company: {
    type: String,
    min: 3,
    max: 50,
    required: true,
  },
  internPeriod: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: String,
    required: true,
  },
  internRole: {
    type: String,
    required: true,
    min: 3,
    max: 250,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  createdBy: {
    type: Object,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: Object,
  },
});

export default mongoose.model("ownerData", studentSchema);
