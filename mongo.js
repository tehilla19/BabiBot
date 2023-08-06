import mongoose from "mongoose";
mongoose.set('strictQuery', false);

/** set model by schema  */
import apiKeys from './src/apikeys.js';
import savedNotes from './src/notes.js';
import barkuni from './src/barkuni.js';
import kupaRashit from "./src/kupaRashit.js";
import mediaNote from './src/mediaNote.js';


export default class Mongo {
  isConnected = false;
  constructor() {
    this.mongoose = mongoose;
    this.apiKeys = apiKeys;
    this.savedNotes = savedNotes;
    this.barkuni = barkuni;
    this.kupaRashit = kupaRashit;
    this.mediaNote = mediaNote;
    this.connectionString = process.env.MONGOOSE + '/API_KEYS'//?retryWrites=true&w=majority'
    this.connection = mongoose.connection;

    mongoose.connect(this.connectionString, {
      useNewUrlParser: true,
      ssl: true,
      sslValidate: false
    })

    this.connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
      this.isConnected = true;

    });
    this.connection.once("close",  () => {
      console.log("MongoDB database connection has been closed");
      this.isConnected = false;
    });

  }
  /** 
   * can take one argument of key
   * @param {{name: String,  apikey: String,  phone: String}} key
   */
  async findApiKey(key) {
    if (this.isConnected)
      return (await this.apiKeys.findOne(key))?.toJSON()
  }

}