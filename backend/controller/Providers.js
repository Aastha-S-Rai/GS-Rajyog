import { setProvider, readProvider, updateProvider, removeProvider } from "../models/Providers.js";
import bcrypt from "bcrypt";

async function createProvider(req, res) {
  const data = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  data.password = hashedPassword;
  const result = await setProvider(data);
  if (result) {
    res.status(200);
    res.json({ res: result });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
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
  const response = await readProvider(filter);
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
