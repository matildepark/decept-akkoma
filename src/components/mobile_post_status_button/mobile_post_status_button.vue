<template>
  <button
    v-if="isLoggedIn"
    class="MobilePostButton button-default new-status-button"
    :class="{ 'hidden': isHidden, 'always-show': isPersistent }"
    @click="openPostForm"
  >
    <svg
      fill="var(--Text)"
      height="16px"
      width="16px"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7113 1.5L13.5 4.36844V14.5H2.5L2.50011 1.50013L10.7113 1.5ZM3.5001 2.50012L3.50001 13.5H12.5V4.77443L10.2888 2.50001L3.5001 2.50012ZM5.00035 4.92599L9.33368 4.92891L9.33301 5.92891L4.99968 5.92599L5.00035 4.92599ZM5.00001 7.49608H11V8.49608H5.00001V7.49608ZM5.00057 10.0653L11.0006 10.072L10.9995 11.072L4.99945 11.0653L5.00057 10.0653Z"
      />
    </svg>
  </button>
</template>

<script src="./mobile_post_status_button.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.MobilePostButton {
  &.button-default {
    width: 5em;
    height: 5em;
    border-radius: 100%;
    position: fixed;
    bottom: 1.5em;
    right: 1.5em;
    // TODO: this needs its own color, it has to stand out enough and link color
    // is not very optimal for this particular use.
    background-color: $fallback--fg;
    background-color: var(--btn, $fallback--fg);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3), 0px 4px 6px rgba(0, 0, 0, 0.3);
    z-index: 10;

    transition: 0.35s transform;
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }

  &.hidden {
    transform: translateY(150%);
  }

  svg {
    font-size: 1.5em;
    color: $fallback--text;
    color: var(--text, $fallback--text);
  }
}

@media all and (min-width: 801px) {
  .new-status-button:not(.always-show) {
    display: none;
  }
}

</style>
