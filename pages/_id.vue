<template>
  <div class="container">
    <p>{{ message }}</p>
    <p>{{ this.$route.params.id }}</p>
  </div>
</template>

<script>
export default {
  data: function()
  {
    return {
      message: "users/_id.vueを表示中"
    }
  }
}
</script>

<style>

</style>
