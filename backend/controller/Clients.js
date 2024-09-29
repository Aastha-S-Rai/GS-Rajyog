import {
  setClient,
  readClient,
  removeClient,
  updateClient,
} from "../models/Clients.js";
import bcrypt from "bcrypt";

async function createClient(req, res) {
  const data = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  data.password = hashedPassword;
  const result = await setClient(data);
  if (result) {
    res.status(200);
    res.json({ res: result });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

async function getClient(req, res) {
  const filter = req.body.filter;
  const users = await readClient(filter);
  if (users) {
    res.status(200);
    res.json({ res: users });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

async function delClient(req, res) {
  const filter = req.body.filter;
  const response = await removeClient(filter);
  if (response) {
    res.status(200);
    res.json({ res: response });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

async function editClient(req, res) {
  const filter = req.body.filter;
  const update = req.body.update;
  const user = await updateClient(filter, update);
  if (user) {
    res.status(200);
    res.json({ res: user });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

export default { createClient, getClient, editClient, delClient };
