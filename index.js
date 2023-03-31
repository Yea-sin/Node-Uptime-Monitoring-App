// NODE UPTIME MONITORING APP

// dependencies
const http = require('http');
const {handelReqRes} = require('./helpers/handleReqRes');

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

app.handelReqRes = handelReqRes;


// start server
app.createServer();