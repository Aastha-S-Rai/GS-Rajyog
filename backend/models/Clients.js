import connector from "./db_connection.js";
import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  birth_time: { type: String, required: true },
  birth_city: { type: String, required: true },
  birth_state: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_no: { type: Number, required: true },
  contact_through: {
    type: String,
    enum: ["Email", "Web-Chat"],
    required: true,
  },
});

clientSchema.virtual("name").get(function () {
  return `${this.fname} ${this.lname}`;
});

const Client = connector.model("clients", clientSchema);

export async function setClient(clientData) {
  const newClient = new Client(clientData);
  const client = await newClient.save();
  return client;
}

export async function readClient(filter) {
  const client = Client.find(filter);
  return client;
}

export async function updateClient(filter, update) {
  const client = await Client.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log("SSR client => ", client);
  if (client) {
    console.log(Client);
    return true;
  } else {
    return false;
  }
}

export async function removeClient(filter) {
  const deleteResult = await Client.deleteOne(filter);
  return deleteResult.acknowledged;
}
