import faker from 'faker'
import shortId from 'shortid'
import random from 'random'

const generatePost = () => {
  return {
    id: shortId.generate(),
    title: faker.lorem.paragraph(),
    user: {
      id: shortId.generate,
      nickname: faker.name.findName(),
    },
    commentCount: random.int(0, 10),
    likeCount: random.int(0, 100),
    repostCount: random.int(0, 5),
  }
}

export const fetchPublicFeed = async (_params = {}) => {
  return new Promise<any>((resolve, _rejects) => {
    setTimeout(() => {
      const postData = Array(10)
        .fill(1)
        .map(() => generatePost())
      resolve(postData)
    }, 1000)
  })
  // const response = await axios.get('/api/public/feed')
  // return response.data
}
