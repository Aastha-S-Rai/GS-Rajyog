import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import clientRouter from './routes/Clients.js';
import serviceRouter from './routes/Services.js';
import providerRouter from './routes/Providers.js';
import requestRouter from './routes/Request.js'
import path from "path";
const app = express();
const port = 5000;

import { fileURLToPath } from "url";

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const corsOptions = {
//   origin: "https://banking-system-byaastha.onrender.com", // frontend URI (ReactJS)
// }

// app.use(cors(corsOptions));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.use('/accounts', accountRouter);
app.use('/clients', clientRouter);
app.use('/services', serviceRouter);
app.use('/providers', providerRouter);
app.use('/requests', requestRouter);
// app.use('/login', loginUser);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});