const { model, Schema, Model } = require("mongoose");

module.exports = model("rankSchema", new Schema({
    GuildId: String,
    Enabled: Boolean
}))