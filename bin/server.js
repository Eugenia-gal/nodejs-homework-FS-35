import app from "../app.js";
import db from "../lib/db";

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {});
console.log(`Server not running. ${err.message}`);
