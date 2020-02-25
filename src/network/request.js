import axios from 'axios'


export  function request(config) {
  // return new Promise((resolve,reject)=>{
    const instance=axios.create({
      // baseURL:'http://123.207.32.32:8000',
      baseURL : "http://123.207.32.32:8000/api/hy",
      // baseURL : "http://106.54.54.237:8000/api/hy",
      timeout:5000
    })
    instance.interceptors.request.use(config=>{
      return config
    })
    instance.interceptors.response.use(res=>{
      return res.data
    })
    return instance(config);
  //   instance(config).then(res=>{
  //     resolve(res)
  //   }).catch(err=>{
  //     reject(err)
  //   })
  // })

}

// export const instance1=axios.create({
//   baseURL:'http://123.207.32.32:8000',
//   timeout:5000
// })
