import { readService, removeService,  setService, updateService} from "../models/Services.js";

async function createService(req, res) {
  const data = req.body;
  const result = await setService(data);
  if (result) {
    res.status(200);
    res.json({ res: result });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

async function getService(req, res) {
  const filter = req.body.filter;
  const services = await readService(filter);
  if (services) {
    res.status(200);
    res.json({ res: services });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

async function delService(req, res) {
  const filter = req.body.filter;
  const response = await removeService(filter);
  if (response) {
    res.status(200);
    res.json({ res: response });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

async function editService(req, res) {
  const filter = req.body.filter;
  const update = req.body.update;
  const service = await updateService(filter, update);
  if (service) {
    res.status(200);
    res.json({ res: service });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

export default { createService, getService, delService, editService };
