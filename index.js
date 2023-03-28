// NODE UPTIME MONITORING APP

// dependencies
const http = require('http');
const url = require('url');

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

// handel request response
app.handelReqRes = (req, res) => {
    // handel req url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.path.replace(/^\/|\/$/g, '');
    const queryParamsObject = parsedUrl.query;
    const headersObject = req.headers;
    console.log(headersObject);

     res.end('Server Started')
}

// start server
app.createServer();