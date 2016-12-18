const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const templatePath = rootPath + '/templates';
const templatesExtension = '.hbs';
const commonData = require(rootPath + '/content/common-data.js');

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const Handlebars = require('handlebars');


function mergeObject(obj1, obj2) {
  var obj3 = {};
  for (var attr1 in obj1) { obj3[attr1] = obj1[attr1]; }
  for (var attr2 in obj2) { obj3[attr2] = obj2[attr2]; }
  return obj3;
};


var filenames = fs.readdirSync(templatePath);
filenames.forEach(function(filename) {
  fileBaseName = path.basename(filename, templatesExtension);
  var template = fs.readFileSync(templatePath + '/' + filename, 'utf8');
  Handlebars.registerPartial(fileBaseName, template);
});

fs.readFileAsync('./compile.json', 'utf8')
  .then(function(compileStr) {
    let compileArray = JSON.parse(compileStr);

    let tasks = [];
    compileArray.forEach(function(compileObj, index) {
      fs.readFileAsync(rootPath + '/' + compileObj['layout'], 'utf8')
        .then(function(hbs) {
          let currentPageData = require(rootPath + '/' + compileObj['content']);
          let content = mergeObject(currentPageData, commonData);
          let template = Handlebars.compile(hbs);
          let result = template(content);
          tasks.push(fs.writeFileAsync(rootPath + '/' + compileObj['output'], result, "utf8"));
        })
    })

    Promise.all(tasks)
      .then(function() {
        console.log("done");
      })
  });
