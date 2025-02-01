import {
  setRequest,
  readRequest,
  updateRequest,
  removeRequest,
} from "../models/Request.js";
import mongoose from "mongoose";
import path from "path";

async function createRequest(req, res) {
  const data = req.body;
  const result = await setRequest(data);
  if (result) {
    res.status(200);
    res.json({ res: result });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

async function uploadReport(req, res) {
    try {
        const { request_id } = req.body;
    
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
    
        // Construct the file URL
        const fileUrl = path.join("uploads", req.file.filename);
    
        // Create filter and update for the database
        const idd=new mongoose.Types.ObjectId(request_id);
        const filter = {
          _id: idd,
        };
        const update = {
          fileUrl: fileUrl,
          status: "Ready",
        };
    
        // Update the request in the database
        const updateResponse = await updateRequest(filter, update);
        console.log("Update Request-->", updateResponse);
        const updatedStatus  = await updateRequest({_id: idd}, {status: "Ready"})
        
        res.status(200).json({ message: "File uploaded and request updated successfully" });
      } catch (error) {
        console.error("Error in uploadReport:", error);
        res.status(500).json({ message: "Internal server error", error });
      }
}


async function getRequest(req, res) {
  try {
    const filter = req.body.filter;
    if(filter.provider_id){
        filter.provider_id = new mongoose.Types.ObjectId(filter.provider_id);
    }
    if(filter._id){
        filter._id = new mongoose.Types.ObjectId(filter._id);
    }
    const requests = await readRequest(filter);
    if (requests) {
      res.status(200);
      res.json({ res: requests });
    } else {
      res.status(500);
      res.json({ err: "something went wrong" });
    }
  } catch {
    res.json({ err: "provide filter parameter, or else something is wrong " });
  }
}

async function delRequest(req, res) {
  const filter = req.body.filter;
  const response = await removeRequest(filter);
  if (response) {
    res.status(200);
    res.json({ res: response });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

async function editRequest(req, res) {
  const filter = req.body.filter;
  const update = req.body.update;
  const request = await updateRequest(filter, update);
  if (request) {
    res.status(200);
    res.json({ res: request });
  } else {
    res.status(500);
    res.json({ err: "something went wrong" });
  }
}

export default {
  createRequest,
  getRequest,
  delRequest,
  editRequest,
  uploadReport,
};
