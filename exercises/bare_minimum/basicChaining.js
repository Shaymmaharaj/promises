/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

var promiseFunctions = require('./promiseConstructor');
//(2) then, sends a request to the GitHub API for the user's profile

var promisification = require('./promisification');
//var getGitHubProfileAsync = Promise.promisify(getGitHubProfile); 


//write file promise
const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, error => {
      if (error) { reject(error); }
      resolve('file created successfully with handcrafted Promise!');
    });
  });
};

Promise.promisifyAll([promiseFunctions, promisification, writeFilePromise]);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  
  return promiseFunctions.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(user) {
      //console.log("user:" + user);
      return promisification.getGitHubProfileAsync(user);
    })
    .then(function(gitHubProfile) {
      //console.log("gitHubProfile:"+ JSON.stringify(gitHubProfile));
      //console.log(writeFilePath);
      return writeFilePromise(writeFilePath, JSON.stringify(gitHubProfile));
    });

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
