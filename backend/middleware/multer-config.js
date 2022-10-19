// IMPORT PACKAGE
const multer = require("multer");
const fs = require("fs");

// MIME TYPE DICTIONARY
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// CONFIGURING MULTER
/**
 * Create a constant storage, to pass to "multer" as configuration,
 * which contains the logic needed to tell "multer"
 * where to save incoming files:
 * the destination function tells "multer" to save the files
 * in the pictures folder;
 * if the folder does not exist it will be created with the "fs" module,
 * and the "recursive" property on "true".
 * The filename function tells "multer":
 *  - to use the original name,
 *  - replace spaces, apostrophes, etc., with underscores,
 *  - to put the characters in lowercase,
 *  - and add a Date.now() timestamp as the filename.
 * then uses the MIME type dictionary constant,
 * to resolve the appropriate file extension.
 */
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    fs.mkdir("../backend/images", { recursive: true }, function (error) {
      if (error) {
        console.error(error);
      } else {
        callback(null, "images");
        console.error("Image successfully added to 'images' folder");
      }
    });
  },
  filename: (_req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const name = file.originalname
      .split("." + extension)
      .join("_")
      .replace(/[\s'/"!?*:;,<>&]+/g, "_")
      .toLowerCase();
    callback(null, name + Date.now() + "." + extension);
  },
});

// EXPORT MULTER
/**
 * Exports fully configured "multer" element,
 * by passing it the "storage" constant,
 * and indicating that we will only manage
 * downloads of single "image" type files.
 */
module.exports = multer({ storage: storage }).single("image");
