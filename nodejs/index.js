const http = require('http');
var express = require('express');
const app = express();
const { Pool, Client } = require('pg');
const router = express.Router();

var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
// var conn = "postgres://postgres:i11Matic@localhost:5432/k2";
var conn = "postgres://postgres:i11Matic@localhost:5432/postgres";
var db = pgp(conn);

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

const client = new Client();
// add peice of middleware to parse json in body of request 
// (not enabled by default in express)
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

var config = {
    host: 'localhost',
    user: 'postgres',
    password: 'i11Matic',
    database: 'k2'
}

var pool = new Pool(config);

app.get('/', (req, res) => {
  res.send('route(1): ROOT');
});

app.get('/cases-callback', (request, response) => {
  pool.query('select * from cases', (error, result) => {
    if (error) {
      throw error
    }
    console.log('/cases-callback result.rows: ' +result.rows)
    //response.status(200).json(result.rows)
    response.json(result.rows)
  });
});

// app.put('/files/:username/:status', (req, res, next) => {
//   console.log('index.js /files/poc/ username = ' + req.params.username);
//   console.log('index.js /files/poc/ username = ' + req.params.status);
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//   res.setHeader('Access-Control-Allow-Credentials', true); // If needed
//   res.send('cors problem fixed:)');
//   db.any('update files set file_status=${status} where poc_user=${username}', req.params)
//   .then(function (data) {
//     res.status(200)
//     .json({
//       data
//     });
//   })
//   .catch(function(err) {
//     return next(err);
//   });
// });

app.put('/file/:id/:approval', (req, res, next) => {
  console.log('/file/:id/:approval file_id = ' + req.params.id);
  console.log('/file/:id/:approval approval = ' + req.params.approval);
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  // res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  // next()
    db.any('update files set case_status=${approval} where id=${id}', req.params)
  .then(function () {
    res.status(200)
    .json({
      status: 'success',
      message: 'Updated one file'
    });
    })
    .catch(function (err) {
      return next(err);
    });
  });

  app.post('/upload', (req, res, next) => {
    req.body.file_type_id = parseInt(req.body.file_type_id);
    req.body.file_origin_id = parseInt(req.body.file_origin_id);
    console.log('/files:  req.body.author = ' + req.body.author);
    console.log('/files:  req.body.poc_user = ' + req.body.poc_user);
    
    db.none('INSERT INTO files (file_subject, file_location, file_type_id, file_detail, file_origin_id, case_id, case_status, poc_user, author)' +
    // 'VALUES (6, \'King of NY\', \'Bronx\', 30, \'Gangster returns\', 29);',
    'VALUES (${file_subject}, ${file_location}, ${file_type_id}, ${file_detail}, ${file_origin_id}, ${case_id}, \'Inactive\', ${poc_user}, ${author})',
    req.body)
    .then(function () {
      res.status(200)
      .json({
        status: 'success',
        message: 'Inserted one file'
      });
      })
      .catch(function (err) {
        return next(err);
      });
    });

app.post('/files', (req, res, next) => {
  req.body.file_type_id = parseInt(req.body.file_type_id);
  req.body.file_origin_id = parseInt(req.body.file_origin_id);
  console.log('/files:  req.body.author = ' + req.body.author);
  console.log('/files:  req.body.poc_user = ' + req.body.poc_user);
  
  db.none('INSERT INTO files (file_subject, file_location, file_type_id, file_detail, file_origin_id, case_id, case_status, poc_user, author)' +
  // 'VALUES (6, \'King of NY\', \'Bronx\', 30, \'Gangster returns\', 29);',
  'VALUES (${file_subject}, ${file_location}, ${file_type_id}, ${file_detail}, ${file_origin_id}, ${case_id}, \'Inactive\', ${poc_user}, ${author})',
  req.body)
  .then(function () {
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one file'
    });
    })
    .catch(function (err) {
      return next(err);
    });
  });

app.get('/files-promise', (req, res, next) => {
  db.any('select * from files')
  .then(function (data) {
    res.status(200)
    .json({
      data
    });
  })
  .catch(function(err) {
    return next(err);
  });
});

app.get('/file/:id', (req, res, next) => {
  console.log('/files/:id = ' + req.params.id);
  db.any('select * from files where file_id=${id}', req.params)
  .then(function (data) {
    res.status(200)
    .json({
      data
    });
  })
  .catch(function (err) {
    return next(err);
  });
});

app.get('/role/:user/:pwd', (req, res, next) => {
  console.log('/role/:username = ' + req.params.user);
  console.log('/role/:password = ' + req.params.pwd);
  db.any('select k2_role from k2_user inner join k2_role on k2_user.role_id = k2_role.role_id where k2_user.username = ${user} and k2_user.k2_password = ${pwd};', req.params)
  .then(function (data) {
  res.status(200)
  .json({
    data
  });
  })
  .catch(function(err) {
    return next(err)
  });
});

app.get('/files/author/:login_user', (req, res, next) => {
  console.log('/files/author/ req.params.login_user = ' + req.params.login_user);
  db.any('select * from files where author=${login_user} and (case_status=\'Inactive\' or case_status=\'Approved\' or case_status=\'Rejected\')', req.params)
  .then(function (data) {
    res.status(200)
    .json({
      data
    });
  })
  .catch(function(err) {
    return next(err);
  });
});

app.get('/files/poc/:login_user', (req, res, next) => {
  console.log('/files/user/ req.params.login_user = ' + req.params.login_user);
  db.any('select * from files where poc_user=${login_user} and (case_status=\'Inactive\' or case_status=\'Approved\' or case_status=\'Rejected\')', req.params)
  .then(function (data) {
    res.status(200)
    .json({
      data
    });
  })
  .catch(function(err) {
    return next(err);
  });
});

app.get('/cases-promise', (req, res, next) => {
  db.any('select * from cases')
    .then(function (data) {
      // res.writeHead(200, {
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin' : '*',
      //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      // })
      res.status(200) //res
        .json({
          //status: 'success',
          data
          //message: 'Retrieved ALL Cases ' 
        });
    })
    .catch(function (err) {
      return next(err);
    });
});

app.get('/cases/:id', (req, res) => {
    pool.connect()
    .then(client => {
      return client.query(`SELECT * FROM cases WHERE id = ${req.params.id}`)
        .then(res => {
          console.log(res.rows)
          client.release()       
        })
        .catch(e => {
          client.release()
        })
    })
});

const port = process.env.PORT || 3000;
app.listen(port,  () => console.log(`RUNNING on port ${port}`));