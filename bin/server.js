// import { mkdir } from "fs/promises";
import app from "../app.js";
import db from "../lib/db.js";
import fs from "fs/promises";

const PORT = process.env.PORT || 4000;

db.then(() => {
  app.listen(PORT, async () => {
    await fs.mkdir(process.env.UPLOAD_DIR, { recursive: true });
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. ${err.message}`);
});
