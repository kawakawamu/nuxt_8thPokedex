<template>
  <div>

  </div>
</template>
<script>
  export default {
    create: function() {
      this.$store.dispatch('pokes/init')
    }
  }
</script>
