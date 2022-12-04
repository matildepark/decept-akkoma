<template>
  <div
    v-if="(visibility === 'public' || visibility === 'unlisted') && loggedIn"
    class="QuoteButton"
  >
    <button
      class="button-unstyled interactive"
      :class="{'-active': quoting}"
      :title="$t('tool_tip.quote')"
      @click.prevent="$emit('toggle')"
    >
      <i
        class="las la-quote-right"
        style="font-size:16px;"
      />
    </button>
  </div>
</template>

<script src="./quote_button.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.QuoteButton {
  display: flex;

  > :first-child {
    padding: 10px;
    margin: -10px -8px -10px -10px;
  }

  .action-counter {
    pointer-events: none;
    user-select: none;
  }

  .interactive {
    &:hover,
    &.-active {
      color: $fallback--cBlue;
      color: var(--cBlue, $fallback--cBlue);
    }
  }

}
</style>
