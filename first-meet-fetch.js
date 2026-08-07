const url = "https://jsonplaceholder.typicode.com/posts/1";


async function getPost(){
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error){
        console.error ("Something went wrong", error);
    }
}
getPost();