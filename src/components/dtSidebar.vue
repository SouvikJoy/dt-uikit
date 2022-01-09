<template>
  <div
    id="full-screen-example"
    class="sidenav bg-light p-2 mt-3"
    data-color="dark"
    data-mode="side"
    data-hidden="false"
    data-scroll-container="#scrollContainer"
    style="
      width: 300px;
      height: 100vh;
      position: fixed;
      transition: all 0.3s linear 0s;
      transform: translateX(0%);
    "
  >
    <div
      id="scrollContainer"
      style="max-height: calc(100% - 245px); position: relative; margin: 60px 0"
    >
      <ul class="sidenav-menu">
        <li class="sidenav-item">
          <router-link to="/">Accordion</router-link>
        </li>
        <li class="sidenav-item">
          <router-link to="/">Alert</router-link>
        </li>
      </ul>
    </div>
    <div class="text-center" style="height: 100px">
      <hr class="mb-4 mt-0" />
      <p>Debugger.tech</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "dtSidebar",
};
</script>

<style lang="scss">
ul {
  list-style-type: none;
}
.sidenav-item {
  font-size: 2.5ch;
  font-weight: bolder;
  line-height: 200%;
  letter-spacing: 0.15em;
}
</style>
