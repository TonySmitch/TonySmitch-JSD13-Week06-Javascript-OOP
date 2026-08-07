import https from "node:https";

const url = "https://jsonplaceholder.typicode.com/posts/1";

// The "callback" style: getPost does the work and, when it's done, calls the
// function you handed it. By convention the callback's first argument is the
// error (null if everything went fine) and the second is the data.
//
// Note: fetch/Promises didn't exist in early JavaScript, so this is how async
// code used to look. Node's https module still uses this older callback style.
function getPost(callback) {
  https
    .get(url, (response) => {
      let body = "";

      // The response arrives in chunks; collect them as they come in.
      response.on("data", (chunk) => {
        body += chunk;
      });

      // Once the last chunk has arrived, parse the full body.
      response.on("end", () => {
        const data = JSON.parse(body);
        callback(null, data);
      });
    })
    // handle error gracefully
    .on("error", (error) => {
      callback(error, null);
    });
}

getPost((error, data) => {
  if (error) {
    console.error("Something went wrong!", error);
    return;
  }
  console.log(data);
});