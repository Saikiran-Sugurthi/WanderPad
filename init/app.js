const mongoose = require("mongoose");
const Listing = require("../models/listingSchema.js");
const insertData = require("../init/data");

const MONGO_URL =
  "mongodb+srv://saikiransugurthi1:143Saikiran@zerodhaclonecluster.irfiip8.mongodb.net/WanderPad?retryWrites=true&w=majority&appName=ZerodhaCloneCluster";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDb = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(insertData.data);
  console.log("Data was initialised");
};

initDb();
