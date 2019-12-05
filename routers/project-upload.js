/**
 * project-upload.js
 * 处理project-文件上传/删除路由
 */
var express = require('express')
var multer = require('multer')
var fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, '..', 'uploads')

//配置multer
var storage = multer.diskStorage({
  //配置保存目录
  destination: function(req, file, cb) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, err => {
        if (err) {
          console.log(err)
        } else {
          cb(null, dirPath)
        }
      })
    } else {
      cb(null, dirPath)
    }
  },
  //配置文件名
  filename: function(req, file, cb) {
    var fileformat = path.extname(file.originalname)
    console.log(fileformat)
    cb(null, file.fieldname + '-' + Date.now() + fileformat)
  }
})

//使用配置
var upload = multer({ storage: storage })
const uploadSingle = upload.single('file')

module.exports = function fileUpload(router) {
  router.post('/upload', (req, res) => {
    uploadSingle(req, res, function(err) {
      //错误处理
      if (err) {
        return res.send({
          code: 1,
          msg: '上传文件失败'
        })
      }
      var file = req.file
      res.send({
        code: 0,
        name: file.filename,
        url: 'http://localhost:3001/uploads/' + file.filename
      })
    })
  })
}
