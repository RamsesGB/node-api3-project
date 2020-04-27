const server = require("./server.js");

const PORT = 7999;

server.listen(PORT, () => {
  console.log(`\n API running on ${PORT} \n`);
});