<template>
  <div class="ReplyButton">
    <button
      v-if="loggedIn"
      class="button-unstyled interactive"
      :class="{'-active': replying}"
      :title="$t('tool_tip.reply')"
      @click.prevent="$emit('toggle')"
    >
      <i
        class="ReplyButton las la-reply"
        style="font-size:16px;"
        :title="$t('tool_tip.reply')"
      />
    </button>
    <a
      v-else
      class="button-unstyled interactive"
      target="_blank"
      role="button"
      :href="remoteInteractionLink"
    >
      <i
        class="ReplyButton las la-reply"
        style="font-size:16px;"
        :title="$t('tool_tip.reply')"
      />
    </a>
    <span
      v-if="status.replies_count > 0"
      class="action-counter"
    >
      {{ status.replies_count }}
    </span>
  </div>
</template>

<script src="./reply_button.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.ReplyButton {
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
