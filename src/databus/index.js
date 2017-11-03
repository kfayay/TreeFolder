import axios from 'axios'
import {BASEURL, RequestList} from './Url'

if (process.env.NODE_ENV !== 'production') {
  require('./MockData')
}

const instance = axios.create({
  baseURL: BASEURL
})

instance.interceptors.response.use(function (response) {
  let data = response.data
  return Promise.resolve(data)
}, function (err) {
  return Promise.reject(err)
})

export function getDepartmentList (params = {}) {
  return instance.get(RequestList.departmentList, {params})
}
