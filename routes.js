const fs = require('fs');

const requestHandler= (req, res) => {

    const method = req.method;
    const url = req.url;
    if(url === '/'){
        
        fs.readFile("index.txt", {encoding : 'utf-8'}, (err, data) =>{
            if(err){
                console.log(err);
            }
            //console.log(data);
            res.write('<html>');
            res.write('<head> <title> Message </title></head>');
            res.write(`<body> ${data} </body>`)
            res.write('<body> <form action= "/message" method = "POST"> <input type = "text" name = "message"/> <button type = "submit" >Send</button> </form> </body>')
            res.write('</html>');
            return res.end();
        });
            
        
    }


    if(url === '/message'  && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('index.txt',message, (err) =>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

    
        });    
        
    }   
}

// module.exports = requestHandler;

// module.exports = {
//     handler : requestHandler,
//     text : "Hii Sanjeev"
// };
       
module.exports.handler = requestHandler;