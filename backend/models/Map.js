import connector from "./db_connection.js";
import mongoose from "mongoose";

const mapSchema = mongoose.Schema({
  provider: { type: String, required: true },
  service: { type: String, required: true },
  service_name: {type: String, required: true},
  price: { type: Number, required: true }
});

const Map = connector.model("map", mapSchema);

export async function setMap(mapData) {
  const newMap = new Map(mapData);
  const map = await newMap.save();
  return map;
}

export async function setMultipleMap(datalist) {
    const result = await Map.insertMany(datalist, {ordered: true});
    return result.acknowledged;
}

export async function readMap(filter) {
  console.log(filter)
  const mapp = await Map.find(filter);
  // console.log(mapp)
  return mapp;
}

export async function updateMap(filter, update) {
  const map = await Map.findOneAndUpdate(filter, update, {
    new: true,
  });
  if (map) {
    return true;
  } else {
    return false;
  }
}

export async function removeMap(filter) {
  const deleteResult = await Map.deleteOne(filter);
  return deleteResult.acknowledged;
}
