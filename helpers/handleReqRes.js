// dependencies
const url = require('url');
const {StringDecoder} = require("string_decoder");
const routes = require('../routes');
const {notFoundRouteHandler} = require('../handlers/routeHandlers/notFoundHandler')

// module sca-folding
const handler = {};

// handel request response
handler.handleReqRes = (req, res) =>{

    const parsedUrl = url.parse(req.url, true); //current url, with other parameters (true);

    const path = parsedUrl.pathname;

    const trimmedPath = path.replace(/^\/|\/$/g, ''); 

    const method = req.method.toLowerCase();

    const queryParamsObject = parsedUrl.query;

    const headersObject = req.headers;

    const requestedParams = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryParamsObject,
        headersObject
    }

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundRouteHandler;
    
    chosenHandler(requestedParams, (statusCode, payload)=>{
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;

        payload = typeof(payload) === 'object' ? payload : {};

        const stringPayload = JSON.stringify(payload);

        res.writeHead(statusCode);
        res.end(stringPayload);

    })

    const decoder = new StringDecoder('utf-8'); // specifying how it will decode (utf-8)
    let realData = '';

    req.on('data', (buffer)=>{
        realData += decoder.write(buffer);
    })

    req.on('end', (data)=>{
        realData += decoder.end(data);

        res.end('Server started');

        // console.log(realData);
    })



}

module.exports = handler;