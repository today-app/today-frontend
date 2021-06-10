import axios from 'axios'

if (typeof window !== 'undefined') {
  axios.interceptors.request.use(
    function (config) {
      const pass = ['/oauth', '/public']
      if (pass.filter(u => config.url?.includes(u)).length !== 0) return config

      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) return Promise.reject('No Token')

      config.headers.authorization = `Bearer ${accessToken}`
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      return Promise.reject(error)
    },
  )
}
