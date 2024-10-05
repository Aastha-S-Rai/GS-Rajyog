import {
  setProvider,
  readProvider,
  updateProvider,
  removeProvider,
} from "../models/Providers.js";
import { setMultipleMap } from "../models/Map.js";
// import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

async function createProvider(req, res) {
  const data = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  data.password = hashedPassword;
  const { services } = data;
  delete data.services;
  if (services) {
    let result = await setProvider(data);

    if (result) {
      let services_list = [];
      let insertt = [];
      for (const i in services) {
        let objectId = result._id;
        let objectIdString = objectId.toString();
        // let serviceobjectId = i;
        // const serviceobjectIdString = serviceobjectId.toString();
        let data={
            provider: objectIdString,
            service: i,
            service_name: services[i][0],
            price: services[i][1],
          }
        insertt.push(data);
        services_list.push(data);
      }
      let ack = await setMultipleMap(insertt);
      let newResult = JSON.parse(JSON.stringify(result));
      newResult.services = services_list;
      res.status(200);
      res.json({ res: newResult });
    } else {
      res.status(500);
      res.json({ err: "something went wrong" });
    }
  }
}

async function getProvider(req, res) {
  const filter = req.body.filter;
  const providers = await readProvider(filter);
  if (providers) {
    res.status(200);
    res.json({ res: providers });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

async function delProvider(req, res) {
  const filter = req.body.filter;
  const response = await removeProvider(filter);
  if (response) {
    res.status(200);
    res.json({ res: response });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

async function editProvider(req, res) {
  const filter = req.body.filter;
  const update = req.body.update;
  const provider = await updateProvider(filter, update);
  if (provider) {
    res.status(200);
    res.json({ res: provider });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

export default { createProvider, getProvider, editProvider, delProvider };
