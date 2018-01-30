import {request} from '../../utils/http'

const createDocu = params => {      // 用于新建一个文档
  return request('/WordEdit/word/newAWord', params, 'get') // 该接口的params为token和title
}

const getDocuContent = params => {   // 用于获取一个文档信息，包括id/title/word/uid/createTime/updateTime
  return request('/WordEdit/word/getWordInfo', params, 'get') // 该接口的params为token和word_id
}

const deleteDocu = params => {   // 用于删除一篇文档
  return request('/WordEdit/word/deleteWord', params, 'get')  // 该接口的params为token和word_id
}

const editContent = params => {   // 编辑正文信息
  return request('/WordEdit/word/editWord', params, 'post')   // params为token和word_id和word_content
}

const getOpLog = params => {        // 获取操作记录，返回id,wordId,uid,opTime
  return request('/WordEdit/word/getOpLog', params, 'get')     // params为token和word_id和page
}

const getAllWord = params => {     // 请求所有正文内容，返回id，title，word，uid，createTime，updateTime
  return request('/WordEdit/word/getAllWord', params, 'get')  // params为token和page
}

const getMyModifyDocu = params => {     // 请求我修改的
  return request('/WordEdit/word/getMyModification', params, 'get')
}
const getMyDocu = params => {     // 请求我建立的
  return request('/WordEdit/word/getMyNewWord', params, 'get')
}
export default {
  createDocu,
  getDocuContent,
  deleteDocu,
  editContent,
  getOpLog,
  getAllWord,
  getMyModifyDocu,
  getMyDocu
}
