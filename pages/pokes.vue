<template>
  <div>
    <p>確認</p>
  </div>
</template>
<script>
  export default {
    created: function() {
      this.$store.dispatch('pokedex/init')
    }
  }
</script>
