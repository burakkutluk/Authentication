import mongoose from "mongoose";

//DB connection mongoose
const conn = () => {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "starter-project", //DB name
    })
    .then(() => {
      console.log("DB Connected"); //success message
    })
    .catch((err) => {
      console.log(`DB connection err: ${err}`);
    });
};

export default conn;
