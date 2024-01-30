import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  // mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log("------------- MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(
      "mongodb+srv://dragomir:dragomirprod@imoti-bg-prod.vzwei.mongodb.net/imoti-bg-prod?retryWrites=true&w=majority"
    );
    // await mongoose.connect(
    //   "mongodb+srv://drashotest:test@lc-brokers.h59eb.azure.mongodb.net/"
    // );
    console.log(".. connected to DB ..");
    isConnected = true;
  } catch (error) {
    console.log("WE HAVE ERROR DURING THE CONNECTION");
    console.log(error);
  }
};
