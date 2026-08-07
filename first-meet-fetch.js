const url = "https://jsonplaceholder.typicode.com/post/1";

async function getPost(){
    try{
        const response = await fethc (url);
        const data = await response.json();
        console.log(data);
    } catch (error){
        console.error ("Something went wrong", error);
    }
}