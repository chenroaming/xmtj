<template>
  <div class="">
    account
  </div>
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      msg: 'Welcome to your vueName'
    }
  },
  computed: {

  },
  mounted() {
    this.$emit('update:nowChoice', '账号管理')
  },
  methods: {

  }
}
</script>

<style scoped lang = "scss">

</style>
