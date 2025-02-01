import connector from "./db_connection.js";
import { readProvider } from "./Providers.js";
import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
  service_name: { type: String, required: true },
  stones: [{ type: String, default: null }],
  required_details: [{ type: String, default: null }],
  description: { type: String, required: true },
  providers: [
    {
      provider_id: { type: connector.Schema.Types.ObjectId, ref: "providers" },
      provider_name: { type: String },
      rating: { type: Number },
      price: { type: Number },
    },
  ],
});

const Service = connector.model("services", serviceSchema);

export async function setService(serviceData) {
  if (serviceData.providers[0]) {
    const id = new mongoose.Types.ObjectId(
      serviceData.providers[0].provider_id
    );
    const provider_data = await readProvider({ _id: id });
    if (provider_data) {
      serviceData.providers[0].provider_id = id;
    }
  }
  const service_data = await readService({
    service_name: serviceData.service_name,
  });
  
  if (service_data.length!=0) {
    const idd=new mongoose.Types.ObjectId(service_data[0]._id)
    const service = Service.updateOne(
      { _id: idd },            // Find the document by ID
      { $push: { providers: serviceData.providers[0] } }// Push the new item to the `providers` array
    )
    return service;
  } else {
    const newService = new Service(serviceData);
    const service = await newService.save();
    return service;
  }
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
