import axios from 'axios'

export const fetchAccessToken = async (code: string) => {
  const response = await axios.post('/api/oauth/token', {
    grantType: 'authorization_code',
    code: code,
  })
  return response.data
}
