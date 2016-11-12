const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const Handlebars = require('handlebars');

fs.readFileAsync('./compile.json', 'utf8')
  .then(function(compileStr) {
    let compileArray = JSON.parse(compileStr);

    let tasks = [];
    compileArray.forEach(function(compileObj, index) {
      fs.readFileAsync(rootPath + compileObj['layout'], 'utf8')
        .then(function(hbs) {
          let content = require(rootPath + compileObj['content']);
          let template = Handlebars.compile(hbs);
          let result = template(content);
          tasks.push(fs.writeFileAsync(rootPath + compileObj['output'], result, "utf8"));
        })
    })

    Promise.all(tasks)
      .then(function() {
        console.log("done");
      })
  });
