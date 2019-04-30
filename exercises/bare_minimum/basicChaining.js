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
// (1) reads a GitHub username from a `readFilePath`
//  *     (the username will be the first line of the file)
//pluckFirstLineFromFileAsync = function(filePath)
// var Pool = require("mysql/lib/Pool");
// var Connection = require("mysql/lib/Connection");
// Promise.promisifyAll([Pool, Connection]);
var promiseFunctions = require('./promiseConstructor');
//(2) then, sends a request to the GitHub API for the user's profile

var promisification = require('./promisification');
//var getGitHubProfileAsync = Promise.promisify(getGitHubProfile); 



// Promise.promisifyAll(db)

// var addNewUserToDatabaseAsync = function(user) {
//   // The outermost `return` lets us continue the chain
//   // after an invocation of `addNewUserToDatabaseAsync`
//   return db.findUserInDatabaseAsync(user)
//     .then(function(existingUser) {
//       if (existingUser) {
//         throw new Error('User already exists!') // Head straight to `catch`. Do not pass Go, do not collect $200
//       } else {
//         return user; // Return a synchronous value
//       }
//     })
//     .then(function(newUser) {
//       return db.hashPasswordAsync(newUser) // Return a promise
//     })
//     .then(function(securedUser) {
//       return db.createAndSaveUserAsync(securedUser) // Return another promise
//     })
// }

//write file promise
const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
      fs.writeFile(file, data, error => {
          if (error) reject(error);
          resolve("file created successfully with handcrafted Promise!");
      });
  });
};

Promise.promisifyAll([promiseFunctions, promisification, writeFilePromise]);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  
  return promiseFunctions.pluckFirstLineFromFileAsync(readFilePath)
  .then(function(user){
    //console.log("user:" + user);
   return promisification.getGitHubProfileAsync(user);
  })
  .then(function(gitHubProfile){
    //console.log("gitHubProfile:"+ JSON.stringify(gitHubProfile));
    //console.log(writeFilePath);
    return writeFilePromise(writeFilePath, JSON.stringify(gitHubProfile));
  })

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
