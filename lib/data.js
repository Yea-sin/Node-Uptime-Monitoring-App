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
                            console.log('Error on cloding file');
                        }
                    })

                }else{
                    console.log('Error on writing file');
                }
            })


        }else{
            console.log('Error on opening file');
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
    fs.open(lib.baseDir+dir+''+file+'.json', 'r+', (err, fileDescriptor)=>{
// console.log(lib.baseDir+dir+'/'+file+'.json');
        
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err)=>{
                if(!err && fileDescriptor){
                    fs.writeFile(fileDescriptor, stringData, (err)=>{
                        if(!err && fileDescriptor){
                            fs.close(fileDescriptor,err=>{
                                if(!err){
                                    callback('closed')
                                }else{
                                    callback('error on close')
                                }
                            })
                        }else{
                            callback('error on write file')
                        }
                    });
                }else{
                    callback('error on truncating')
                }
            })

        }else{
            callback('error on opening file')
        }
    } )
}

// delete
lib.delete = function (dir, file, callback) {
    
    fs.unlink(lib.baseDir+dir+'/'+file+'.json', (err)=>{
        if(!err){
            callback('File Successfully Deleted!!')
        }else{
            callback('Error On Deleting File!!')
        }
    })

}



module.exports = lib;