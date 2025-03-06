const http=require('http');
const server=http.createServer((req,res)=>{
    //Settheresponseheader
    res.writeHead(200,{'Content-Type':'text/plain'});
//Writearesponsetotheclient
    res.end('HelloWorld!Thisismyfirstserver.\n');
});//Serverlistensonport3000
server.listen(3000,'127.0.0.1',()=>{
    console.log('Serverrunningathttp://127.0.0.1:3000/');
});