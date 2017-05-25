const unrar = require("node-unrar-js");
var fs = require("fs");

var buf = Uint8Array.from(fs.readFileSync("./sample.rar")).buffer;
var extractor = unrar.createExtractorFromData(buf);
var extracted = extractor.extractFiles(["1.jpg"], "password");
console.log(extracted);
let files = extracted[1].files;
files.forEach(function (file) {
    if (file.extract[0].state === "SUCCESS") {
        let uint8Array = file.extract[1];
        let buffer = Buffer.from(uint8Array);
        fs.writeFile("stuff.jpg", buffer, { encoding: "base64" }, function (err) {
            console.log("successfully write file stuff.jpg")
        })
    }
})