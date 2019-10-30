/**
 * 路由表
 * 处理/leader/xxx
 */
/*
leaderName: { type: String, required: true },
sector: { type: String, default: '测评部' },
leaderPhone: { type: String, default: '' },
leaderMail: { type: String, default: '' },
*/
var express = require('express');
var router = express.Router();

const Leaders = require("../db/Leaders");


/**
 * 添加负责人
 * /leader/add
 * POST 
 */

router.post('/add', (req, res, next) => {
  const leader = req.body
  //1 查询是否已存在
  Leaders.find({ leaderName: leader.leaderName }, (err, result) => {
    console.log(result)
    if (err) {
      return next(err)
    }
    if (result.length > 0) {
      return res.send({ code: 1, msg: '项目负责人已存在' })
    }
    //2 不存在,保存
    new Leaders(leader).save((err, result) => {
      if (err) {
        return next(err)
      }
      res.send({ code: 0, msg: '添加成功', result })
    })
  })
})

/**
 * 删除项目负责人
 * /leader/del?_id=xxxxxxxxx
 * GET
 * {_id:string}
 */
router.get('/del', (req, res, next) => {
  const target = req.query
  console.log(req.query)
  Leaders.findOneAndDelete(target, (err, result) => {
    if (err) {
      return next(err)
    }
    if (!result) {
      return res.send({ code: 1, msg: '删除失败,负责人不存在' })
    }
    res.send({ code: 0, msg: '项目负责人已删除' })
  })
})


/**
 * 修改项目负责人
 * POST
 * /leader/edit
 */
/*
leaderName: { type: String, required: true },
sector: { type: String, default: '测评部' },
leaderPhone: { type: String, default: '' },
leaderMail: { type: String, default: '' },
*/
router.post('/edit', (req, res, next) => {
  const { _id } = req.body
  //1 查询是否已存在
  Leaders.findByIdAndUpdate(_id, req.body, { useFindAndModify: false, new: true }, (err, result) => {

    if (err) {
      return next(err)
    }
    if (!result) {
      return res.send({ code: 1, msg: '项目负责人不存在' })
    }
    res.send({ code: 0, msg: '编辑成功', leader: result })
  })
})


/**
 * 查询所有负责人
 * /leader/all
 * GET
 * 无参数
 */
router.get('/all', (req, res, next) => {
  const conditions = req.query
  Leaders.find(conditions, (err, result) => {
    if (err) {
      return next(err)
    }
    res.send({ code: 0, msg: '项目负责人请求成功', leaders: result })
  })
})









module.exports = router;