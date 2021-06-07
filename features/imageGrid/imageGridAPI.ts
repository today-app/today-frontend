export const getSplashImage = (page = 20, key = ''): Promise<any[]> => {
  return fetch(`https://api.unsplash.com/photos/?client_id=${key}&per_page=${page}`)
    .then(res => res.json())
    .catch(err => {
      throw err
    })
}
