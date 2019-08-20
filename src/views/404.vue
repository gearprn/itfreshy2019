<template>
  <b-container fluid class="notfound">
    <b-jumbotron style="background: rgba(0,0,0,0);">
      <template slot="header">404</template>
      <template slot="lead">Not found!</template>
    </b-jumbotron>
  </b-container>
</template>

<script>
export default {
  name: "404 Page"
};
</script>

<style lang="scss" scoped>
.notfound {
  min-height: calc(100vh - 142px);
}
</style>