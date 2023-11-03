const { model, Schema, Model } = require("mongoose");

module.exports = model("loggingSchema", new Schema({
    GuildId: String,
    ChannelId: String,
    Enabled: Boolean
}))