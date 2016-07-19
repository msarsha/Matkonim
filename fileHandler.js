var fs = require('fs');

function SaveImage(base64Image, filePath, cb){

    var matches = base64Image.match(/^(data:image\/([A-Za-z\/]+);base64,)(.+)/);
    
    if(matches.length != 4){
        return cb('invalid file format', null);
    }
    
    var imageRawData = matches[3];
    var fileExtension = matches[2];
    var imageBase64Prefix = matches[1];
    
    fs.writeFile(filePath, imageRawData, { encoding: 'base64' }, function(err){
        if(err){
            return cb(err, null);
        }
        
        return cb(null, 'file saved - ' + filePath);
    })
}

function DecodeImage(filePath, cb){
    fs.readFile(filePath, 'base64', function(err, data){
        
        if(err){
            return cb(err, null);
        }
        
        data = 'data:image/jpeg;base64,' + data;
        return cb(null, data);
    });
}

module.exports = {
    SaveImage: SaveImage,
    DecodeImage: DecodeImage
}