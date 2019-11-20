/**
 * 路由表
 * 处理/project/xxx
 */
/*
  name: { type: String, required: true },            //项目名称  *
  unit: { type: String, required: true },            //项目单位  *
  contact: { type: String, default: '' },            //联系人
  contactInfo: { type: String, default: '' },        //联系方式
  remark: { type: String, default: '' },             //项目备注
  contractStatus: { type: String, default: '0' },                //合同状态       0 未签订 , 1 我方签章 , 2 对方签章 , 3 已签订 ,4 其他
  contractNumber: { type: String, default: '0' },                //合同编号(项目编号)
  contractSigner: { type: String },              //合同签署方  
  contractYear: { type: String},                //合同年份         
  contractPrice: { type: Number, default: 0 },                   //合同金额
  contractRemark: { type: String, default: '' },                 //合同备注 
  payWays: { type: String, default: '0' },          //支付方式   0 两次支付  1 一次性支付   4 其他
  payStatus: { type: String, default: '0' },        //支付状态   0 未支付   1 首款支付   2 二款支付  3 已完成支付  4 其他
  invoiceStatus: { type: String, default: '0' },    //发票状态  0 未开票   1 首款发票   2 二款发票  3 所有发票已开  4 其他
  invoiceNumber: { type: String, default: '' },     //发票号码1
  invoiceNumber2: { type: String, default: '' },    //发票号码2
  invoiceNumber3: { type: String, default: '' },    //发票号码3
  payRemark: { type: String, default: '' },         //支付备注 
  exeLeader: { type: String, required: true },                   //项目负责人    * 
  exeCompany: { type: String },                  //项目合作方    
  exeStatus: { type: String, default: '0' },                    //项目实施状态   0 未实施  1 完成现场   2 完成整改  3 报告签章   4 其他
  exeRemark: { type: String, default: '' },                     //实施备注 
*/
var express = require('express');
var router = express.Router();

const Projects = require("../db/Projects");


/**
 * 添加项目
 * /project/add
 * POST 
 */
router.post('/add', (req, res, next) => {
  const project = req.body
  const { name } = project
  //1 查询是否已存在
  Projects.find({ name }, (err, result) => {
    if (err) {
      return next(err)
    }
    if (result.length > 0) {
      return res.send({ code: 1, msg: '项目已存在' })
    }
    //2 不存在,保存
    //2.1 生成时间
    project.createDate = new Date()
    new Projects(project).save((err, result) => {
      if (err) {
        return next(err)
      }
      res.send({ code: 0, msg: '添加成功', result })
    })
  })
})

/**
 * 删除项目
 * /project/del?_id=xxxxxxxxx
 * GET
 * {_id:string}
 */
router.get('/del', (req, res, next) => {
  const target = req.query
  console.log(req.query)
  Projects.findOneAndDelete(target, (err, result) => {
    if (err) {
      return next(err)
    }
    if (!result) {
      return res.send({ code: 1, msg: '删除失败,项目不存在' })
    }
    res.send({ code: 0, msg: '项目已删除' })
  })
})


/**
 * 修改项目
 * POST
 * /project/edit
 */
/*
projectName: { type: String, required: true },
sector: { type: String, default: '测评部' },
projectPhone: { type: String, default: '' },
projectMail: { type: String, default: '' },
*/
router.post('/edit', (req, res, next) => {
  const { _id } = req.body
  //1 查询是否已存在
  Projects.findByIdAndUpdate(_id, req.body, { useFindAndModify: false, new: true }, (err, result) => {

    if (err) {
      return next(err)
    }
    if (!result) {
      return res.send({ code: 1, msg: '项目不存在' })
    }
    res.send({ code: 0, msg: '编辑成功', project: result })
  })
})


/**
 * 查询所有项目
 * /project/all
 * GET
 * 无参数
 */
router.get('/all', (req, res, next) => {
  const conditions = req.query
  Projects.find(conditions, (err, result) => {
    if (err) {
      return next(err)
    }
    res.send({ code: 0, msg: '项目请求成功', projects: result })
  })
})

/**
 * 查询 分页查询
 * /project/list
 * GET
 * pageNumber 查询那一页
 * pageSize  每页大小
 */
router.get('/list', (req, res, next) => {
  //1 计算总数
  Projects.find({}, (err, doc) => {
    if (err) {
      return next(err)
    }
    const total = doc.length
    //2 响应请求的分页数据
    const { pageNumber, pageSize } = req.query
    console.log(pageNumber, pageSize)
    //跳过 (页数-1)*每页行数
    //显示 每页行数
    Projects.find().skip((parseInt(pageNumber) - 1) * parseInt(pageSize)).limit(parseInt(pageSize)).exec((error, result) => {
      if (error) {
        return next(error)
      }

      res.send({ code: 0, msg: '分页数据请求成功', total, projects: result })
    })
  })
})

/**
 * 搜索 根据name或unit或exeLeader
 * GET
 * /project/search?
 * {pageNumber,pageSize,name/unit/exeLeader}
 */
router.get('/search', (req, res, next) => {
  //1 判断查询条件
  const { pageNumber, pageSize, name, unit , exeLeader } = req.query
  let condition = {}
  //1.1 name有值,按name查询
  if (name) {
    condition = { name: new RegExp('^.*' + name + '.*$') }
  } else if(unit) {
    //1.2 否则按unit查询
    condition = { unit: new RegExp(`^.*${unit}.*$`) }
  } else if(exeLeader){
    condition = { exeLeader: exeLeader }
  }
  console.log(condition)
  //1 计算总数
  Projects.find(condition, (err, doc) => {
    if (err) {
      return next(err)
    }
    const total = doc.length
    //2 响应请求的分页数据
    //跳过 (页数-1)*每页行数
    //显示 每页行数
    Projects.find(condition).skip((parseInt(pageNumber) - 1) * parseInt(pageSize)).limit(parseInt(pageSize)).exec((error, result) => {
      if (error) {
        return next(error)
      }
      res.send({ code: 0, msg: '分页数据请求成功', total, projects: result })
    })
  })
})









module.exports = router;