const http = require('http');
const fs   = require('fs');
const server = http.createServer((req,res)=>{
        //process.exit();
        const url = req.url;
        const method = req.method;
        if(url === '/')
        {
                res.write('<html>');
                res.write('<head><title>Entered message</title></head>');
                res.write('<body> <form action="/message" method="POST"> <input type="text" name="message"> <button type="submit">Send<button> </form> </body>')
                res.write('</html>');
                return res.end();
        }

        if(url === '/message' && method==='POST')
        {
                const body =[];
                req.on('data', (chunk) =>{
                        //console.log(chunk);
                        body.push(chunk);
                });
                return req.on('end', () => {     
                        const parseBody = Buffer.concat(body).toString();
                        // console.log(parseBody);
                        const message = parseBody.split('=')[1];
                        fs.writeFile('message.txt' , message , (err)=>{
                                res.statusCode=302;
                                res.setHeader('location', '/');
                                return res.end();
                        });
                });
               
        }
        
 
        res.setHeader("content-Type", "text/html");
        res.write('<html>'); 
        res.write('<head><title>My first Page</title></head>');
        res.write('<body> <h1>Hello from my first Node.JS server </h1> </body>');
        res.write('</html>');
        res.end();
});

server.listen(3000);

