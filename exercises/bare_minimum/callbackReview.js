/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// fs.readFile(__dirname + '/README.md', 'utf8', function (err, content) {
//   console.log('Example from callbackReview.js')
//   if (err) {
//     console.log('fs.readFile failed :(\n', err)
//   } else {
//     console.log('fs.readFile successfully completed :)\n', content)
//   }
// });

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      //console.log(data.toString().split('\n')[0]);
      callback(null, data.toString().split('\n')[0]);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`

// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });
var getStatusCode = function (url, callback) {
  request(url, (err, response) => {
    if (err) {
      callback(err);
    } else {
      
      callback(null, response && response.statusCode );
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
