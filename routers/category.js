/**
 * 路由表
 * 处理/cate/xxx
 */
var express = require('express');
var router = express.Router();
var md5 = require('blueimp-md5')

const Categorys = require("../db/Categorys");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});





/**
 * 添加类型
 * /cate/add
 * POST
 */
// name: { type: String, required: true },
// parentID: { type: String, default: 0 },

router.post('/add', (req, res, next) => {
  const newCate = req.body
  //1 查询是否已存在
  Categorys.find({ name: newCate.name }, (err, result) => {
    console.log(result)
    if (err) {
      return next(err)
    }
    if (result.length > 0) {
      return res.send({ code: 1, msg: '项目类型已存在' })
    }
    //2 不存在,保存
    new Categorys(newCate).save((err, result) => {
      if (err) {
        return next(err)
      }
      res.send({ code: 0, msg: '添加成功', result })
    })
  })
})

/**
 * 删除项目类型
 * GET
 * /cate/del?name=xxxx
 */
router.get('/del', (req, res, next) => {
  const target = req.query
  console.log(req.query)
  Categorys.findOneAndDelete(target, (err, result) => {
    if (err) {
      return next(err)
    }
    if (!result) {
      return res.send({ code: 1, msg: '删除失败,类型不存在' })
    }
    res.send({ code: 0, msg: '项目类型已删除' })
  })
})


/**
 * 修改指定项目类型名
 * POST
 * {_id , newName}
 * /cate/edit
 */
router.post('/edit', (req, res, next) => {
  const { _id, newName } = req.body
  //1 查询是否已存在
  Categorys.findOne({ name: newName }, (error, doc) => {
    if (error) {
      return next(error)
    }
    console.log(doc)
    //1.1 已存在
    if (doc) {
      return res.send({ code: 1, msg: '项目类型名已存在' })
    }
    //1.2 不存在,更新
    Categorys.findByIdAndUpdate(_id, { name: newName }, { useFindAndModify: false, new: true }, (err, result) => {
      if (err) {
        return next(err)
      }
      res.send({ code: 0, msg: '编辑成功', category: result })
    })
  })
})


/**
 * 查询所有项目类型 GET
 * cate/all  无条件
 * cate/all?parentID=0  有条件
 */
router.get('/all', (req, res, next) => {
  const conditions = req.query
  Categorys.find(conditions, (err, result) => {
    if (err) {
      return next(err)
    }
    res.send({ code: 0, msg: '项目类型列表请求成功', categorys: result })
  })
})

/**
 * 根据ID查询类型
 * /cate/one?categoryID=
 * GET
 * 根据project的category保存的类型_id,查询对应类型名
 */
router.get('/one',(req,res,next)=>{
  const _id = req.query.categoryID
  Categorys.findById(_id,(error,result)=>{
    if (error) {
      return next(error)
    }
    if (!result){
      res.send({ code: 1, msg: '项目类型未知', category: {} })
    }
    res.send({ code: 0, msg: '项目类型请求成功', category: result })
  })
})









module.exports = router;