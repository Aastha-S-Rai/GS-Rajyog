import connector from "./db_connection.js";
import mongoose from "mongoose";

const providerSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_no: { type: Number, required: true },
  review: { type: Number }
});

providerSchema.virtual("name").get(function () {
  return `${this.fname} ${this.lname}`;
});

const Provider = connector.model("providers", providerSchema);

export async function setProvider(providerData) {
  const newProvider = new Provider(providerData);
  const provider = await newProvider.save();
  return provider;
}

export async function readProvider(filter) {
  const provider = Provider.find(filter);
  return provider;
}

export async function updateProvider(filter, update) {
  const provider = await Provider.findOneAndUpdate(filter, update, {
    new: true,
  });
  if (provider) {
    return true;
  } else {
    return false;
  }
}

export async function removeProvider(filter) {
  const deleteResult = await Provider.deleteOne(filter);
  return deleteResult.acknowledged;
}