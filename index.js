// NODE UPTIME MONITORING APP

// dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const environmentToExport = require('./helpers/environments');

// app object - module sca-folding
const app = {};

// config
app.config = {
    port:3000
};

// create server
app.createServer  = () =>{

    const server = http.createServer(app.handelReqRes);

    server.listen(app.config.port, ()=>{

        console.log(`listening to port ${app.config.port}`);

    })

};

app.handelReqRes = handleReqRes;

// handler.handleReqRes = (req, res) => {
//     // handel req url and parse it
//     const parsedUrl = url.parse(req.url, true);
//     const path = parsedUrl.path.replace(/^\/|\/$/g, '');
//     const queryParamsObject = parsedUrl.query;
//     const headersObject = req.headers;

//     const decoder = new StringDecoder('utf-8');
//     let realData= '';
    
//     req.on('data', (buffer)=>{
//         realData += decoder.write(buffer);
//     })

//     req.on('end', (data)=>{
//         realData += decoder.end();
//         console.log(realData);
//         res.end('Server Started')
//     })

// }


// start server
app.createServer();