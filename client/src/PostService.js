import axios from axios;

const url = 'http://localhost:5000/api/posts';

class PostService {
  // Get Posts
  static getPosts(){
    new Promise(async (resolve, reject) => {
      try {
        const {data} = await axios.get(url);
        resolve (
          data.map(post => ({
            ...post,
            created_at: new Date(post.created_at)
          }))
        )
      } catch (err) {
        reject(err) 
      }
    })
  }
}