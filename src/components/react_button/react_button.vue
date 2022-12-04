<template>
  <Popover
    trigger="click"
    class="ReactButton"
    placement="top"
    :offset="{ y: 5 }"
    :bound-to="{ x: 'container' }"
    remove-padding
    @show="focusInput"
  >
    <template #content="{close}">
      <EmojiPicker
        :enable-sticker-picker="false"
        @emoji="addReaction($event, close)"
      />
    </template>
    <template #trigger>
      <button
        class="button-unstyled popover-trigger"
        :title="$t('tool_tip.add_reaction')"
      >
        <svg
          slot="trigger"
          style="display:inline-block;vertical-align:middle;cursor:pointer;"
          height="16px"
          width="16px"
        >
          <circle
            cx="5"
            cy="6"
            r="1"
          />
          <circle
            cx="11"
            cy="6"
            r="1"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.61157 9C4.0663 11.004 5.85848 12.5 8.00006 12.5C10.1417 12.5 11.9338 11.004 12.3886 9H11.3551C10.9248 10.4457 9.58557 11.5 8.00006 11.5C6.41455 11.5 5.07528 10.4457 4.645 9H3.61157Z"
          />
        </svg>
      </button>
    </template>
  </Popover>
</template>

<script src="./react_button.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.custom-reaction {
  width: 30px !important;
}

.ReactButton {
  .reaction-picker-filter {
    padding: 0.5em;
    display: flex;

    input {
      flex: 1;
    }
  }

  .reaction-picker-divider {
    height: 1px;
    width: 100%;
    margin: 0.5em;
    background-color: var(--border, $fallback--border);
  }

  .reaction-picker {
    width: 10em;
    height: 9em;
    font-size: 1.5em;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5em;
    text-align: center;
    align-content: flex-start;
    user-select: none;

    mask: linear-gradient(to top, white 0, transparent 100%) bottom no-repeat,
          linear-gradient(to bottom, white 0, transparent 100%) top no-repeat,
          linear-gradient(to top, white, white);
    transition: mask-size 150ms;
    mask-size: 100% 20px, 100% 20px, auto;

    /* Autoprefixed seem to ignore this one, and also syntax is different */
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    .emoji-button {
      cursor: pointer;

      flex-basis: 20%;
      line-height: 1.5;
      align-content: center;

      &:hover {
        transform: scale(1.25);
      }
    }
  }

  /* override of popover internal stuff */
  .popover-trigger-button {
    width: auto;
  }

  .popover-trigger {
    padding: 10px;
    margin: -10px;

    &:hover .svg-inline--fa {
      color: $fallback--text;
      color: var(--text, $fallback--text);
    }
  }

  .popover {
    transform: translateX(-64px) translateY(5px);
    min-width: 70%;
  }
}

</style>
