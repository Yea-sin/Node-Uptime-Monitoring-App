// module scaffolding
const handler = {};

handler.sampleRouteHandler = (requestedParams, callBack) =>{
    console.log(requestedParams);
    callBack(200, {
        message:'This is sample route'
    });
};

module.exports = handler;