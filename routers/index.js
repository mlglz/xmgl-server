var express = require('express')
var router = express.Router()
var md5 = require('blueimp-md5')

const Users = require('../db/Users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

/*-------- Users -------*/

/**
 * 用户登录 POST
 * 1 请求参数
 * 2 判断
 * 3 响应
 * code:500)
 * code:1)
 * code:0) 成功
 * cookie
 * {code:0 , msg:'userLogin sucess' , user:result}
 */

router.post('/login', (req, res, next) => {
  // * 1 请求参数
  const { username, password } = req.body

  // * 2 判断
  Users.findOne(req.body, { password: 0 }, (err, result) => {
    // * 3 响应
    if (err) {
      return next(err)
    }
    if (!result) {
      return res.send({ code: 1, msg: 'username or password wrong' })
    }
    res.cookie('userid', result._id, { maxAge: 3600 * 1000 * 24 })
    res.send({ code: 0, msg: 'userlogin sucess', user: result })
  })
})

/**
 * 新建用户 POST
 * /register
 */
router.post('/register', (req, res, next) => {
  const { username, password } = req.body

  //处理已存在
  Users.find({ username }, (err, result) => {
    if (err) {
      return next(err)
    }
    if (result.length > 0) {
      return res.send({ code: 1, msg: 'username exist' })
    }

    new Users({ username, password }).save((err, result) => {
      if (err) {
        return next(err)
      }
      res.send({ code: 0, msg: 'User register success.' })
    })
  })
})

/**
 * 删除用户 GET
 * /deluser?username=u3
 */
router.get('/deluser', (req, res, next) => {
  const query = req.query
  console.log(query)
  Users.findOneAndDelete(query, (err, result) => {
    if (err) {
      return next(err)
    } //处理错误username
    if (!result) {
      return res.send({ code: 1, msg: `${query.username} not available` })
    }
    res.send({ code: 0, msg: `Delete sucess , username : ${result.username}` })
  })
})

/**
 * 查询所有用户 GET
 */
router.get('/alluser', (req, res, next) => {
  Users.find({}, (err, result) => {
    res.send(result)
  })
})

module.exports = router
