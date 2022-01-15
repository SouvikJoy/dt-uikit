<template>
  <div v-if="type !== undefined">
    <div :class="`dt-card-content type-${this.type}`">
      <div class="dt-card">
        <div class="dt-card__img" v-if="$slots.header">
          <slot name="header"></slot>
          <div class="dt-card__interactions" v-if="$slots.interactions">
            <span>
              <slot name="interactions"></slot>
            </span>
          </div>
        </div>
        <div class="dt-card__text" v-if="$slots.content">
          <div class="dt-card__title" v-if="$slots.title">
            <h3>
              <slot name="title"></slot>
            </h3>
          </div>
          <p>
            <slot name="content"></slot>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="dt-card-content dt-card-basic">
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
        <div class="dt-card-content" v-if="$slots.content">
          <slot name="content"></slot>
        </div>
        <div class="dt-card-interactions" v-if="$slots.interactions">
          <slot name="interactions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DtCard",
  props: {
    type: String,
  },
};
</script>

<style></style>
