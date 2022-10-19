// IMPORT PACKAGES
const http = require("http");
const app = require("./app");

// RETURNS A VALID PORT WHETHER SUPPLIED AS A NUMBER OR A STRING.
/**
 * If the port is a number: return the port.
 * If the port is a string: return the string.
 * If the port is a negative number: return false.
 * @param val - The value of the port that we want to normalize.
 * @returns The port number or the string value of the port number.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

// SETTING SERVER PORT
/**
 * Setting the port to the value of the environment variable PORT
 * or 3000 if the environment variable PORT is not set.
 */
const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

// SEARCH AND MANAGE THE DIFFERENT SERVER ERRORS.
/**
 * If the error is not related to the server listening: throw the error.
 * If the error is related to the server listening:
 *  1 - then check if the error is related to the port being in use or
 *      if the port requires elevated privileges:
 *       1.1 - If the error is related to the port being in use:
 *            - log the error and exit the process.
 *       1.2 - If the error is related to the port requiring elevated privileges:
 *            - log the error and exit the process.
 *  2 - If the error is not related to the port being in use
 *      or the port requiring elevated privileges:
 *        -  throw the error.
 * @param error - The error object that was thrown
 */
function errorHandler(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/* Creating a server that is listening to the port that is passed in. */
const server = http.createServer(app);

/* Listening for an error event and then calling the errorHandler function. */
server.on("error", errorHandler);

/* Logging into the console the named port or channel the server is running on. */
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

/* Listening to the port that is passed in. */
server.listen(port);
