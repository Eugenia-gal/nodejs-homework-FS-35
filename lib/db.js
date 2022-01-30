import mongoose from "mongoose";
const { connect, connection } = mongoose;

const uri = process.env.URI_DB;

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () => {
  console.log("Database connection successful");
});

connection.on("err", (err) => {
  console.log(`\x1B[31m Database connection error: ${err.message}`);
});

connection.on("disconnected", () => {
  console.log("\x1b[34m Database disconnected");
});

process.on("SIGINT", async () => {
  connection.close();
  console.log("Database connection closed");
  process.exit(1);
});

export default db;
