/**
 * Companys
 * 合作公司
 */
const mongoose = require('./db')

//建立company结构
const companySchema = mongoose.Schema({
  companyName: { type: String, required: true },   //公司简称
  companyFName: { type: String, required: true },   //公司全称
  companyContact: { type: String, required: true },
  companyPhone: { type: String, default: '' },
  companyMail: { type: String, default: '' },
  companyStatus:{type:String , default:'1'}    //0不可用 , 1可用
})

//新建Companys表
//使用结构companySchema ,对应数据库里的表格(集合)
const Companys = mongoose.model('Companys', companySchema, 'companys')

module.exports = Companys