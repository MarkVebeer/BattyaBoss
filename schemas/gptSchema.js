const { model, Schema, Model } = require("mongoose");

module.exports = model("gptSchema", new Schema({
    GuildId: String,
    ChannelId: String,
    Enabled: Boolean
}))