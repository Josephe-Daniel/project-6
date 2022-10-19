// IMPORT MODULES
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// USER MODEL
/**
 * In the schema, the "unique" value
 * (with the mongoose-unique-validator element passed as a plugin),
 * will ensure that no two users can share the same email address.
 */
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * the mongoose-unique-validator element is passed as a plugin to the schema
 */
userSchema.plugin(uniqueValidator);

// EXPORT USER MODEL
module.exports = mongoose.model("User", userSchema);
