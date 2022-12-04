<template>
  <div class="RetweetButton">
    <button
      v-if="(visibility !== 'private' || isOwn) && visibility !== 'direct' && loggedIn"
      class="button-unstyled interactive"
      :class="status.repeated && '-repeated'"
      :title="$t('tool_tip.repeat')"
      @click.prevent="retweet()"
    >
      <i
        style="font-size:16px;"
        :class="[classes, animated ? 'animate-spin' : '']"
        class="RetweetButton las la-retweet -interactive"
        :title="$t('tool_tip.repeat')"
      />
    </button>
    <span v-else-if="loggedIn">
      <i style="font-size:16px;" :class="classes" class="RetweetButton las la-lock" :title="$t('timeline.no_retweet_hint')"/>
    </span>
    <a
      v-else
      class="button-unstyled interactive"
      target="_blank"
      role="button"
      :href="remoteInteractionLink"
    >
    <i style="font-size:16px;" :class="classes" class="RetweetButton las la-retweet" :title="$t('tool_tip.repeat')"/>
    </a>
    <span
      v-if="!mergedConfig.hidePostStats && status.repeat_num > 0"
      class="no-event"
    >
      {{ status.repeat_num }}
    </span>
    <teleport to="#modal">
      <confirm-modal
        v-if="showingConfirmDialog"
        :title="$t('status.repeat_confirm_title')"
        :confirm-text="$t('status.repeat_confirm_accept_button')"
        :cancel-text="$t('status.repeat_confirm_cancel_button')"
        @accepted="doRetweet"
        @cancelled="hideConfirmDialog"
      >
        {{ $t('status.repeat_confirm') }}
      </confirm-modal>
    </teleport>
  </div>
</template>

<script src="./retweet_button.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.RetweetButton {
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
    animation-duration: 0.6s;

    &:hover,
    &.-repeated {
      color: $fallback--cGreen;
      color: var(--cGreen, $fallback--cGreen);
    }
  }
}
</style>
