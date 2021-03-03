import mongoose from "mongoose";

// DB connections
export const db = () => {
  mongoose.connect(
    "mongodb://localhost:27017",
    {
      dbName: "Intern_Tracker",
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err: mongoose.CallbackError) => {
      if (err) {
        console.error("Mongo error...", err);
      } else {
        console.info("DB connected successfully");
      }
    }
  );
};
