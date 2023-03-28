const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @param buffer sticker data
 * @param name name of sticker
 */
let barkuni = new Schema(
    {
        buffer: {
            type: Buffer,
            required: true,
        },
        name: {
            type: String,
            required: false,
        }
    },
    { collection: "BarkunisStickers" }
);

module.exports  = mongoose.model("Barkuni", barkuni);