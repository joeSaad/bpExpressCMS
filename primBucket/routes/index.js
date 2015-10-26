var express = require('express');
var router = express.Router();

var fs = require("fs"),
    json;

var path = require('path');


function readJsonFileSync(filepath, encoding) {
    if (typeof(encoding) == 'undefined') {
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(fileTypes, file) {

    filepath = path.resolve(__dirname + "/../../primApp/" + fileTypes + "/" + file); // right one

    console.log('cwd :' + process.cwd() + '__dirname: ' + __dirname + "   ************************");

    console.log('process.env.pwd :' + process.env.PWD);
    console.log('filepath ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ :' + filepath);
    return readJsonFileSync(filepath);
}


/* GET home page. */
router.get('/*', function(req, res, next) {
    if (req.originalUrl === "/") {
        req.originalUrl = "page1";
    };

    console.log('page :' + req.originalUrl);

    var jsonPage = req.originalUrl.replace("/", "");

    console.log('document :' + process.cwd());

    pageObject = getConfig("pages", jsonPage + ".json");

    console.dir(pageObject);


    console.log('*********************************template_name :' + pageObject.template_name);

    var pageTemplateObject = getConfig("templates", pageObject.template_name + ".json");

    console.log('pageTemplateObject :' + pageTemplateObject.panel1.component);

    for (var propt in pageTemplateObject) {
        pageObject[propt] = pageTemplateObject[propt];
    }

    console.dir(pageObject);

    var pagesPath = path.resolve(__dirname + "/../../primApp/pages/");

    // get pages BEGIN
    var pagesArr = [];
    fs.readdir(pagesPath, function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
            console.log('file :' + file);

            pagesArr.push(file.replace(".json", ""));
            // do something with each file HERE!
        });
        console.log('pagesArr :' + pagesArr);
        pageObject["menuPages"] = pagesArr;

        console.dir(pageObject);

        res.render('../views/layouts/' + pageTemplateObject.uses, pageObject); // added here temporarily for retreiving the menu of pages

    });
    // get pages END

});

module.exports = router;
