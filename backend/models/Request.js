import connector from "./db_connection.js";
import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
  fileUrl: { type: String },
  uploadedAt: { type: Date, default: Date.now },
  provider_id: { type: connector.Schema.Types.ObjectId, ref: "providers", required: true},
  service_id: { type: connector.Schema.Types.ObjectId, ref: "services", required: true },
  status: { type: String, enum: ["Pending", "Ready", "Complete"], default: "Pending" },
  price: { type: Number, required: true },
  client_id: { type: connector.Schema.Types.ObjectId, ref: "clients", required: true },
  client_name: { type: String, required: true },
  special_requirements: { type: String },
  service_name: { type: String, required: true },
});


const Request = connector.model("requests", requestSchema);

export async function setRequest(requestData) {
  requestData.client_id = new mongoose.Types.ObjectId(requestData.client_id);
  requestData.service_id = new mongoose.Types.ObjectId(requestData.service_id);
  requestData.provider_id = new mongoose.Types.ObjectId(requestData.provider_id)
  console.log("Request-data ==> ",requestData)
  const newRequest = new Request(requestData);
  const request = await newRequest.save();
  return request;
}

export async function readRequest(filter) {
  const request = Request.find(filter);
  return request;
}

export async function updateRequest(filter, update) {
  const request = await Request.findOneAndUpdate(filter, update, {
    new: true,
  });
  if (request) {
    return true;
  } else {
    return false;
  }
}

export async function removeRequest(filter) {
  const deleteResult = await Request.deleteOne(filter);
  return deleteResult.acknowledged;
}
