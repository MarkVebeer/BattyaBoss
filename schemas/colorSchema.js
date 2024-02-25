const { model, Schema, Model } = require("mongoose");

module.exports = model("colorSchema", new Schema({
    GuildId: String,
    Enabled: Boolean
}))