function testMiddle(req, res, next) {
  console.log("Request was received");
  next();
}

function restrictLoggedInUserOnly(req, res, next) {
  // check logged in user here
  next();
}

module.exports = { testMiddle };
