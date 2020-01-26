console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form');

const search = document.querySelector('input');
const message1 = document.querySelector('#msg1');
const message2 = document.querySelector('#msg2');
//const message3 = document.querySelector('#msg3');
weatherForm.addEventListener('submit', (e)=>{
e.preventDefault();

const location = search.value;
message1.textContent="loading...";
message2.textContent = "";

fetch("http://localhost:3000/weather?address="+location).then((response)=>{

response.json().then((data)=>{

    console.log(data);
    
   if(!data.err){


    message1.textContent = data.location;
    message2.textContent=data.forecast;

    // return console.log(data);


   }
   else{

  console.log(data.err);

message1.textContent = data.err;
   }
   
});




    
});







});

