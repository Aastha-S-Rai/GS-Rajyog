import connector from './db_connection.js';
import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    fname: { type: String, required:true },
    lname: { type:String, required:true },
    birth_time:{ type: String, required:true },
    birth_city:{ type: String, required:true },
    birth_state:{ type: String, required:true },
    email: { type:String, required:true },
    password: { type: String, required:true },
    phone_no: { type: Number, required:true },
    contact_through: {type: String, enum: ['Email', 'Web-Chat'] ,required:true}
});
clientSchema.virtual('name').get(function() { return `${this.fname} ${this.lname}`; });

const Client = connector.model('users', clientSchema);

export async function setClient(clientData) {
    const newClient = new Client(clientData);
    const client = await newClient.save();
    return client;
}

export async function readClient(filter) {
    const client = Client.find(filter);
    return client
}

export async function updateClient(filter, update) {
  console.log(update);
  const client = await Client.findOneAndUpdate(filter, {update}, {
    new: true
  });
  return true;
}

export async function removeClient(filter) {
  const deleteResult = await User.deleteMany(filter);
  return deleteResult.acknowledged;
}
  