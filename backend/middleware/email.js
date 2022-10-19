// EXPORT OF BUSINESS LOGIC CONCERNING EMAIL
/**
 * Check if the email has a correct format:
 * if the email is correct:
 *  - continue to the next function
 * else:
 *  - return a response with a status 400 and a message
 * @param {Object}   req  the request object
 * @param {Object}   res  the response object
 * @param {Function} next continue to the next function
 * @returns {Oject}  status of the response with a message
 */
module.exports = (req, res, next) => {
  const email = req.body.email;
  const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g;
  if (re.test(email)) {
    next();
  } else {
    return res.status(400).json({ error: "incorrect email format" });
  }
};
