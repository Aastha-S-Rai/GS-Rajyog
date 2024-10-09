import { updateMap, removeMap } from "../models/Map.js";

async function editMap(req, res) {
  const filter = req.body.filter;
  const update = req.body.update;
  const upp = await updateMap(
    { provider: filter.provider, service: filter.service },
    { price: update.price }
  );
  if (upp) {
    res.status(200);
    res.json({ res: upp });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

async function delMap(req, res) {
  const filter = req.body.filter;
  const response = await removeMap({
    provider: filter.provider,
    service: filter.service,
  });
  if (response) {
    res.status(200);
    res.json({ res: response });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

export default { editMap, delMap };
