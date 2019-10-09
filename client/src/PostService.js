import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

export default class PostService {
  static getPosts() {
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(url);
        const formattedPosts = data.map(post => ({
          ...post,
          created_at: new Date(post.created_at)
        }));
        resolve(formattedPosts);
      } catch (err) {
        reject(err);
      }
    });
  }

  static insertPost(text) {
    return axios.post(url, { text });
  }

  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}
