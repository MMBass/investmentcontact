const express = require('express');
const app = express();
const cors = require('cors');

const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const PORT = process.env.PORT||3000;

app.use(cors())
app.use(express.static('client'));

function exampleFetch(){
    fetch('https://crownheights.info/contact-us')
    .then(res => res.text())
    .then(body => {
         const resDom = new JSDOM(body);
         console.log(resDom);
         let t = resDom.window.document.querySelectorAll('h1')[0].textContent;
console.log(t)
   
    });
    
 }

app.get('/thirtyFive',(req,res)=>{
    exampleFetch();
    fetch('https://www.bizportal.co.il/capitalmarket/indices/performance/33343333')
    .then(res => res.text())
    .then(body => {
         const resDom = new JSDOM(body);
         console.log(resDom);
         let thirtyFive = resDom.window.document.querySelectorAll('.statistics-container ul .num')[4].textContent;

         res.send(thirtyFive);
    });
})

app.get('/hundred',(req,res)=>{
    fetch('https://www.bizportal.co.il/capitalmarket/indices/generalview/33333333')
    .then(res =>res.text())
    .then(body => {
         const resDom = new JSDOM(body);
         let hundred = resDom.window.document.querySelectorAll('.statistics-container ul .num')[4].textContent;

         res.send(hundred);
    })
});

app.get('/allShare',(req,res)=>{
    fetch('https://www.bizportal.co.il/capitalmarket/indices/generalview/523')
    .then(res =>res.text())
    .then(body => {
         const resDom = new JSDOM(body);
         let allShare = resDom.window.document.querySelectorAll('.statistics-container ul .num')[4].textContent;

         res.send(allShare);
         console.log(allShare)
    })
});

app.listen(PORT, ()=>console.log(`listening on port ${PORT}...`));
