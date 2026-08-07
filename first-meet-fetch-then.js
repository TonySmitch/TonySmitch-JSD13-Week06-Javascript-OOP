const url = "https://jsonplaceholder.typicode.com/posts/1";

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    return data;
  })
  .catch((error) => {
    console.error("Something went wrong!", error);
    return error;
  });