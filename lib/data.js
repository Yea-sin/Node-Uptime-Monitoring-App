// dependencies
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

lib.baseDir = path.join(__dirname, '../.data/');

// create
lib.create = function (dir, file, data, callback) {
    
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', (err, fileDescriptor)=>{

        if(!err && fileDescriptor){

            // data stringify
            const stringifyData = JSON.stringify(data);

            // write file
            fs.writeFile(fileDescriptor, stringifyData, (err)=>{
                if(!err){
                    fs.close(fileDescriptor, (err)=>{
                        if(!err){
                            callback(false);
                        }else{
                            console.log(err);
                        }
                    })

                }else{
                    console.log(err);
                }
            })


        }else{
            console.log(err);
        }

    })
}

// read

lib.read = function (dir, file, callback) {
    
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', (err, data)=>{
        if(!err){

            callback(data)


        }else{
            callback('error on read file')
        }
    })
}

// update
lib.update = function (dir, file, data, callback) {
    
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', (err, fileDescriptor)=>{
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);

            // truncate file/ empty file
            fs.ftruncate(fileDescriptor, (err)=>{
                if(!err){
                    fs.writeFile(fileDescriptor, stringData, (err)=>{
                        if(!err){
                            callback(false)
                        }else{
                            callback('can`t write')
                        }
                    })
                }else{
                    callback('truncate failed')
                }
            })


        }else{
            callback('file can`t open')
        }
    }  )

}



module.exports = lib;