const { model, Schema, Model } = require("mongoose");

module.exports = model("welcomeSchema", new Schema({
    GuildId: String,
    ChannelId: String,
    Enabled: Boolean
}))