let PouchDB = require('pouchdb');

let studentsDb = new PouchDB('students');

//Database information
studentsDb.info(function(err, info) {
  if (err) {
      return console.log(err);
  } else {
      console.log(info);
  }
});

function getConnection() {
      return studentsDb;
}

module.exports = { getConnection };