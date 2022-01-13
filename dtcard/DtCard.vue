<template>
  <div class="dt-card dt-component">
    <div class="dt-card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="dt-card-body">
      <div class="dt-card-title" v-if="$slots.title">
        <slot name="title"></slot>
      </div>
      <div class="dt-card-subtitle" v-if="$slots.subtitle">
        <slot name="subtitle"></slot>
      </div>
      <div class="dt-card-content">
        <slot name="content"></slot>
      </div>
      <div class="dt-card-footer" v-if="$slots.footer">
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
