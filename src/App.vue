<template>
  <header>
    <dt-navbar expand="lg" container="md" position="top">
      <dt-navbar-brand href="/">
        <img alt="Vue Logo" height="30" src="@/assets/logo.png" />
        DT-KIT
      </dt-navbar-brand>

      <dt-navbar-toggler
        @click="collapse1 = !collapse1"
        target="#navbarSupportedContent"
      />

      <dt-collapse v-model="collapse1" id="navbarSupportedContent">
        <dt-navbar-nav>
          <dt-navbar-item active to="/">Home</dt-navbar-item>
          <dt-navbar-item to="/">About</dt-navbar-item>
          <dt-navbar-item to="/">Contact</dt-navbar-item>
        </dt-navbar-nav>

        <form class="d-flex input-group w-auto">
          <input
            type="search"
            class="form-control"
            placeholder="Type query"
            aria-label="Search"
          />
          <dt-button outline="primary"> Search </dt-button>
        </form>
      </dt-collapse>
    </dt-navbar>
  </header>

  <main>
    <dt-container>
      <dt-row class="mb-6">
        <dt-col col="4">1 of 1</dt-col>
        <dt-col col="4">1 of 2</dt-col>
        <dt-col col="4">1 of 3</dt-col>
      </dt-row>

      <dt-row class="mb-12">
        <dt-col col="3">2 of 1</dt-col>
        <dt-col col="6">2 of 2</dt-col>
        <dt-col col="3">2 of 3</dt-col>
      </dt-row>

      <dt-accordion v-model="activeItem">
        <dt-accordion-item
          headerTitle="Accordion Item #1"
          collapseId="collapseOne"
        >
          <strong>This is the first item's accordion body.</strong> It is shown
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the MDBAccordionItem, though the transition does limit
          overflow.
        </dt-accordion-item>

        <dt-accordion-item
          headerTitle="Accordion Item #2"
          collapseId="collapseTwo"
        >
          <strong>This is the second item's accordion body.</strong>
          It is hidden by default, until the collapse plugin adds the
          appropriate classes that we use to style each element. These classes
          control the overall appearance, as well as the showing and hiding via
          CSS transitions. You can modify any of this with custom CSS or
          overriding our default variables. It's also worth noting that just
          about any HTML can go within the MDBAccordionItem, though the
          transition does limit overflow.
        </dt-accordion-item>

        <dt-accordion-item
          headerTitle="Accordion Item #3"
          collapseId="collapseThree"
        >
          <strong>This is the third item's accordion body.</strong> It is hidden
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the MDBAccordionItem, though the transition does limit
          overflow.
        </dt-accordion-item>
      </dt-accordion>
    </dt-container>
  </main>
</template>

<script>
import { ref } from "vue";
import DtNavbarNav from "@/components/dtNavbarNav.vue";
export default {
  name: "App",
  components: { DtNavbarNav },
  setup() {
    const activeItem = ref("collapseOne");

    return {
      activeItem,
    };
  },
};
</script>

<style lang="scss">
*,
html {
  box-sizing: border-box;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 80px;
}
main {
  text-align: center;
}
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-height: 52px;
  width: 100%;
}
</style>
