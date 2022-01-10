<template>
  <div class="p-card p-component">
    <div class="p-card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="p-card-body">
      <div class="p-card-title" v-if="$slots.title">
        <slot name="title"></slot>
      </div>
      <div class="p-card-subtitle" v-if="$slots.subtitle">
        <slot name="subtitle"></slot>
      </div>
      <div class="p-card-content">
        <slot name="content"></slot>
      </div>
      <div class="p-card-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
};
</script>

<style>
.p-card-header img {
  width: 100%;
}
.p-card {
  background: #071426;
  color: rgba(255, 255, 255, 0.87);
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 6px;
}
.p-card .p-card-body {
  padding: 1.25rem;
}
.p-card .p-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.p-card .p-card-subtitle {
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}
.p-card .p-card-content {
  padding: 1.25rem 0;
}
.p-card .p-card-footer {
  padding: 1.25rem 0 0 0;
}
</style>
