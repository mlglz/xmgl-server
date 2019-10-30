/**
 * 路由表
 * 处理/company/xxx
 */
/*
  companyName: { type: String, required: true },
  companyContact: { type: String, required: true },
  companyPhone: { type: String, default: '' },
  companyMail: { type: String, default: '' },
*/
var express = require('express');
var router = express.Router();

const Companys = require("../db/Companys");


/**
 * 添加公司
 * /company/add
 * POST 
 */
router.post('/add', (req, res, next) => {
  const company = req.body
   console.log(company)
   //1 查询是否已存在
  Companys.find({ companyName: company.companyName }, (err, result) => {
   
    if (err) {
      return next(err)
    }
    if (result.length > 0) {
      return res.send({ code: 1, msg: '合作公司已存在' })
    }
    //2 不存在,保存
    new Companys(company).save((err, result) => {
      if (err) {
        return next(err)
      }
      res.send({ code: 0, msg: '添加成功', result })
    })
  })
})

/**
 * 删除合作公司
 * /company/del?_id=xxxxxxxxx
 * GET
 * {_id:string}
 */
router.get('/del', (req, res, next) => {
  const target = req.query
  console.log(req.query)
  Companys.findOneAndDelete(target, (err, result) => {
    if (err) {
      return next(err)
    }
    if (!result) {
      return res.send({ code: 1, msg: '删除失败,公司不存在' })
    }
    res.send({ code: 0, msg: '合作公司已删除' })
  })
})


/**
 * 修改合作公司
 * POST
 * /company/edit
 */
/*
companyName: { type: String, required: true },
sector: { type: String, default: '测评部' },
companyPhone: { type: String, default: '' },
companyMail: { type: String, default: '' },
companyStatus:{type:String , default:'1'}
*/
router.post('/edit', (req, res, next) => {
  console.log(req.body)
  const { _id } = req.body
  //1 查询companyName是否已存在
  Companys.findByIdAndUpdate(_id, req.body, { useFindAndModify: false, new: true }, (err, result) => {
    if (err) {
      return next(err)
    }
    if (!result) {

      return res.send({ code: 1, msg: '合作公司不存在' })
    }
    res.send({ code: 0, msg: '编辑成功', company: result })
  })
})


/**
 * 查询所有公司
 * /company/all
 * GET
 * 无参数
 */
router.get('/all', (req, res, next) => {
  const conditions = req.query
  Companys.find(conditions, (err, result) => {
    if (err) {
      return next(err)
    }
    res.send({ code: 0, msg: '合作公司请求成功', companys: result })
  })
})









module.exports = router;