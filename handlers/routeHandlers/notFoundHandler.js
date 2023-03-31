// module scaffolding
const handler = {};

handler.notFoundRouteHandler = (requestedParams, callBack) =>{
    // console.log(requestedParams);
    callBack(404, {
        message:'This is not found route'
    });
};

module.exports = handler;