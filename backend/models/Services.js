import connector from "./db_connection.js";
import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
  service_name: { type: String, required: true },
  stones: [{ type: String, default: null },],
  required_details: [{ type: String, default: null },],
  description: { type: String, required: true }
});

const Service = connector.model("services", serviceSchema);

export async function setService(serviceData) {
  const newService = new Service(serviceData);
  const service = await newService.save();
  return service;
}

export async function readService(filter) {
  const service = Service.find(filter);
  return service;
}

export async function updateService(filter, update) {
  const service = await Service.findOneAndUpdate(filter, update, {
    new: true,
  });
  if (service) {
    return true;
  } else {
    return false;
  }
}

export async function removeService(filter) {
  const deleteResult = await Service.deleteOne(filter);
  return deleteResult.acknowledged;
}
