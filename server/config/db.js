import dotenv from "dotenv";
dotenv.config();

export const { MONGO_URI } = process.env;

export const MONGO_OPTION = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
