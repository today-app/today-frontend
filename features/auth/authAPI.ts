import axios from 'axios'

export const fetchProfile = async () => {
  return await axios.get('https://jsonplaceholder.typicode.com/users')
}
