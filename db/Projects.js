/**
 * Projects
 * 项目
 */
const mongoose = require('./db')






//建立project结构
const projectSchema = mongoose.Schema({
  createDate:{type: Date},
  name: { type: String, required: true },            //项目名称  *
  number: { type: String,  },                        //项目编号
  status: { type: String, default: '0' },            //项目状态  0 未完成  3 已完成  
  categoryID: { type: String },                        //项目类型ID    从Categorys表   
  categoryPID: { type: String, default: '0'  },        //项目父类型ID  从Categorys表   
  remark: { type: String,  },                        //项目备注
  
  unit: { type: String, required: true },            //项目单位  *
  address:{ type: String  },                         //单位地址
  contact: { type: String,  },                       //联系人
  contactPhone: { type: String,  },                  //联系人电话
  contactMail: { type: String,  },                   //联系人手机

  contractStatus: { type: String, default: '0' },      //合同状态       0 未签订 , 1 我方签章 , 2 对方签章 , 3 已签订 ,4 其他
  contractNumber: { type: String,  },                  //合同编号(项目编号)
  party: { type: String,  },                          //甲方名称 
  partyAddr: { type: String,  },                      //甲方地址
  partyContact: { type: String,  },                   //甲方 联系人 
  partyContactInfo: { type: String,  },               //甲方 联系方式
  contractDate: { type: String,  },                    //合同日期     
  contractPrice: { type: Number,  },                   //合同金额
  contractRemark: { type: String,  },                  //合同备注 

  payStatus: { type: String, default: '0' },        //支付状态   0 未支付   1 首款支付   2 二款支付  3 已完成支付  4 其他
  payWays: { type: String, default: '2' },          //支付方式   2笔支付
  tax:{ type: String, },                            //纳税编号
  invoiceStatus: { type: String, default: '0' },    //发票状态  0 未开票   1 首款发票   2 二款发票  3 所有发票已开  4 其他
  invoiceNumber: { type: String,  },                //发票号码1
  invoiceNumber2: { type: String,  },               //发票号码2
  invoiceNumber3: { type: String,  },               //发票号码3
  payRemark: { type: String,  },                    //支付备注 
  
  exeLeader: { type: String, required: true },    //项目负责人    *    从Leaders表
  exeCompany: { type: String, default: '' },      //项目合作方         从Companys表
  exeStatus: { type: String, default: '0' },      //项目实施状态   0 未实施  1 完成现场   2 完成整改  3 报告签章   4 其他
  exeRemark: { type: String,  },                  //实施备注 
  files:[]                                        //附件列表  [file-xxxxx.pdf , file-xxxx.tif]
})

//新建projects表
//使用结构projectSchema ,对应数据库里的表格(集合)
const Projects = mongoose.model('Projects', projectSchema, 'projects')

module.exports = Projects