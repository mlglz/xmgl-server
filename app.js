//app.js  服务器核心文件
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routers/index');
var cateRouter = require('./routers/category');
var leaderRouter = require('./routers/leader');
var companyRouter = require('./routers/company');
var projectRouter = require('./routers/project');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cate', cateRouter);  //处理/cate/xxx
app.use('/leader', leaderRouter);  //处理/leader/xxx
app.use('/company', companyRouter);  //处理/company/xxx
app.use('/project', projectRouter);  //处理/project/xxx
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
//1 服务端log错误
//2 客户端send信息
app.use((err, req, res, next) => {
  console.log('***SERVER ERR***')
  console.log('req URL:', req.url)
  console.log('req path:', req.path)
  console.log('req method:', req.method)
  if (req.method === 'GET') {
    console.log('req query:', req.query)
  } else {
    console.log('req body:', req.body)
  }
  console.log('err message:', err.message)
  res.send({
    code: 500,
    msg: '服务器忙'
  })
})

module.exports = app;
