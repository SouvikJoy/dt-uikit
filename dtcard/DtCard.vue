<template>
  <div class="dt-simple-card dt-component">
    <div class="dt-simple-card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="dt-simple-card-body">
      <div class="dt-simple-card-title" v-if="$slots.title">
        <slot name="title"></slot>
      </div>
      <div class="dt-simple-card-subtitle" v-if="$slots.subtitle">
        <slot name="subtitle"></slot>
      </div>
      <div class="dt-simple-card-content">
        <slot name="content"></slot>
      </div>
      <div class="dt-simple-card-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DtCard",
};
</script>

<style></style>
