<template>
  <div :class="`dt-card-content type-${this.type}`">
    <div class="dt-card">
      <div class="dt-card__img" v-if="$slots.img">
        <slot name="img"></slot>
        <div class="dt-card__interactions" v-if="$slots.interactions">
          <span>
            <slot name="interactions"></slot>
          </span>
        </div>
      </div>
      <div class="dt-card__text" v-if="$slots.text">
        <div class="dt-card__title" v-if="$slots.title">
          <h3>
            <slot name="title"></slot>
          </h3>
        </div>
        <p>
          <slot name="text"></slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DtAnimatedCard",
  props: {
    type: String,
  },
};
</script>

<style></style>
