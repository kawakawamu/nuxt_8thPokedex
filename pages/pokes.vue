<template>
  <div>
    <div>
      <li v-for="(post, index in posts)" :key="index">
        <a :href="'post.url'" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
      </li>
    </div>
  </div>
</template>
<script>
  export default {
    async astncData({ $axios }) {
      const url = "https://qiita.com/api/v2/items";
      const response = await $sxios.$get(url);
      return {
        posts: response
      };
    }
  }
</script>
