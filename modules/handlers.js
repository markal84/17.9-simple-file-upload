var fs = require('fs');
var formidable = require('formidable');

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.uploadDir = "./"; // added to prevent cross-device link not permitted error
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, "test.png"); // Disabled to prevent cross-device link not permitted error caused by formidable, because it is saving file to upload to a diffrent partition than project partition. But now upload from any other location than main folder is not working and /show is not working because it is not renaming file to test.png
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<h1>That is image you uploaded:</h1><br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.show = function(request, response) {
    fs.readFile("test.png", "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}