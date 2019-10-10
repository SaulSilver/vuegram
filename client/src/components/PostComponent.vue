<template>
  <div class="container">
    <h1>Posts</h1>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="create-post">
      <label for="create-post">What's on your mind</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a post">
      <button v-on:click="createPost">Post</button>
    </div>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
        {{`${post.created_at.getFullYear()}/${post.created_at.getMonth()}/${post.created_at.getDate()}`}}
        <p class="text">{{post.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService.js";

export default {
  name: "PostComponent",
  data: () => ({
    posts: [],
    error: "",
    text: ""
  }),
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      try {
        await PostService.insertPost(this.text);
        this.posts = await PostService.getPosts();
      } catch (err) {
        this.error = err.message;
      }
    },
    async deletePost(id) {
      try {
        await PostService.deletePost(id);
        this.posts = await PostService.getPosts();
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
