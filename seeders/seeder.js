import mongoose from "mongoose";

import seedAdmin from "./admin-seeder.js";
import createLevels from "./levlel-seeder.js";
import createTest from "./test-seeder.js";

import connectMongoDB from "../db/connectMongoDB.js";
import "dotenv/config";

async function seeder() {
  try {
    // connection DB
    await connectMongoDB();

    //creating new admin
    await seedAdmin();

    //creating new levels
    await createLevels();

    //creating new tests
    await createTest();

    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
seeder().then(() => console.log("All seeders is completed"));
