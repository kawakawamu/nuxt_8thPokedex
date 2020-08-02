<template>
  <div class="container">
    <p>{{ message }}</p>
    <hr>
    <router-link to="/price">price page</router-link>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      message: "Hello World"
    }
  }
}
</script>

<style>

</style>
