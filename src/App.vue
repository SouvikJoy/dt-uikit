<template>
  <div class="mainApp">App</div>
</template>

<script setup></script>

<style lang="scss">
.mainApp {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

*,
html {
  box-sizing: border-box;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  //background: rgba(217, 214, 214, 0.32);
}
main {
  text-align: center;
  padding: 100px 0 0 300px;
}
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-height: 52px;
  width: 100%;
}
.carousel-item {
  height: 400px !important;
  margin: 60px 0;
}
</style>
