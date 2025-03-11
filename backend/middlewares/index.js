function testMiddle(req, res, next) {
  console.log("Request was received");
  next();
}

module.exports = { testMiddle };
