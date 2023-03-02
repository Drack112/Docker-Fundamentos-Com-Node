import mongoose from "mongoose";

import db from "../config/database";
import { loggerPino } from "../Utils/logger";

const connection = mongoose.connect(
  db.uri,
  {
    autoIndex: true,
  },
  async (err) => {
    if (err) {
      loggerPino.error("🚨 Error trying connect do MongoDB\n" + err);
    } else {
      loggerPino.info("📪 Connected to MongoDB.");
    }
  },
);

export default connection;
