// dependencies
const url = require('url');
const {StringDecoder} = require("string_decoder");

// module sca-folding
const handler = {};

// handel request response
handler.handelReqRes = (req, res) => {
    // handel req url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.path.replace(/^\/|\/$/g, '');
    const queryParamsObject = parsedUrl.query;
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData= '';
    
    req.on('data', (buffer)=>{
        realData += decoder.write(buffer);
    })

    req.on('end', (data)=>{
        realData += decoder.end();
        console.log(realData);
        res.end('Server Started')
    })

}

module.exports = handler;