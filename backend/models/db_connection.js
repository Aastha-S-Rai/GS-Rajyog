import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.DB_URL}`);
// const dbUrl = process.env.DB_URL;
// console.log("MongoDB URL:", dbUrl); // Debugging: check if DB URL is loaded

// mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('Database connected successfully'))
//   .catch(err => console.error('Database connection error:', err));
const connector = mongoose;
export default connector;