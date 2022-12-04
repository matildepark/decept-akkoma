<template>
  <Popover
    class="ExtraButtons"
    trigger="click"
    placement="top"
    :offset="{ y: 5 }"
    :bound-to="{ x: 'container' }"
    remove-padding
  >
    <template #content="{close}">
      <div class="dropdown-menu">
        <button
          v-if="canMute && !status.thread_muted"
          class="button-default dropdown-item dropdown-item-icon"
          @click.prevent="muteConversation"
        >
          <i
            style="display:inline-block;vertical-align:middle;cursor:pointer;margin-left:4px;margin-right:4px;"
            class="las la-bell-slash"
          /><span>{{ $t("status.mute_conversation") }}</span>
        </button>
        <button
          v-if="canMute && status.thread_muted"
          class="button-default dropdown-item dropdown-item-icon"
          @click.prevent="unmuteConversation"
        >
          <i
            style="display:inline-block;vertical-align:middle;cursor:pointer;margin-left:4px;margin-right:4px;"
            class="las la-bell"
          /><span>{{ $t("status.unmute_conversation") }}</span>
        </button>
        <button
          v-if="!status.pinned && canPin"
          class="button-default dropdown-item dropdown-item-icon"
          @click.prevent="pinStatus"
          @click="close"
        >
          <i
            style="display:inline-block;vertical-align:middle;cursor:pointer;margin-left:4px;margin-right:4px;"
            class="las la-thumbtack"
          /><span>{{ $t("status.pin") }}</span>
        </button>
        <button
          v-if="status.pinned && canPin"
          class="button-default dropdown-item dropdown-item-icon"
          @click.prevent="unpinStatus"
          @click="close"
        >
          <i
            style="display:inline-block;vertical-align:middle;cursor:pointer;margin-left:4px;margin-right:4px;"
            class="las la-thumbtack"
          /><span>{{ $t("status.unpin") }}</span>
        </button>
        <button
          v-if="!status.bookmarked"
          class="button-default dropdown-item dropdown-item-icon"
          @click.prevent="bookmarkStatus"
          @click="close"
        >
          <i
            style="display:inline-block;vertical-align:middle;cursor:pointer;margin-left:4px;margin-right:4px;"
            class="las la-bookmark"
          /><span>{{ $t("status.bookmark") }}</span>
        </button>
        <button
          v-if="status.bookmarked"
          class="button-default dropdown-item dropdown-item-icon"
          @click.prevent="unbookmarkStatus"
          @click="close"
        >
          <i
            style="display:inline-block;vertical-align:middle;cursor:pointer;margin-left:4px;margin-right:4px;"
            class="las la-bookmark"
          /><span>{{ $t("status.unbookmark") }}</span>
        </button>
        <button
          v-if="canDelete"
          class="button-default dropdown-item dropdown-item-icon"
          style="display:flex;align-items:center;"
          @click.prevent="deleteStatus"
          @click="close"
        >
          <svg
            style="display:inline-block;vertical-align:middle;cursor:pointer;margin-left:4px;margin-right:0px;"
            stroke="var(--Text,#000000)"
            width="16px"
            height="16px"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.29289 7.99995L3.75747 11.5354L4.46458 12.2425L8 8.70706L11.5355 12.2426L12.2426 11.5355L8.70711 7.99995L12.2428 4.46431L11.5356 3.7572L8 7.29285L4.46443 3.75728L3.75732 4.46438L7.29289 7.99995Z"
            />
          </svg><span>{{ $t("status.delete") }}</span>
        </button>
        <button
          class="button-default dropdown-item dropdown-item-icon"
          @click.prevent="copyLink"
          @click="close"
        >
          <svg
            style="display:inline-block;vertical-align:middle;cursor:pointer;margin-left:4px;margin-right:0px;"
            width="16px"
            height="16px"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.78361 2.70909C8.30172 2.19097 9.00444 1.8999 9.73716 1.8999C11.263 1.8999 12.4999 3.13682 12.4999 4.66264C12.4999 5.39537 12.2088 6.09808 11.6907 6.6162L7.08483 11.2221C6.77888 11.528 6.36394 11.6999 5.93127 11.6999C5.03029 11.6999 4.2999 10.9695 4.2999 10.0685C4.2999 9.63587 4.47178 9.22092 4.77772 8.91498L9.24635 4.44635L9.95345 5.15346L5.48483 9.62209C5.36642 9.74049 5.2999 9.90108 5.2999 10.0685C5.2999 10.4172 5.58258 10.6999 5.93127 10.6999C6.09872 10.6999 6.25931 10.6334 6.37772 10.515L10.9836 5.90909C11.3142 5.57851 11.4999 5.13015 11.4999 4.66264C11.4999 3.68911 10.7107 2.8999 9.73716 2.8999C9.26965 2.8999 8.82129 3.08562 8.49071 3.4162L3.74757 8.15934C3.20482 8.7021 2.8999 9.43822 2.8999 10.2058C2.8999 11.8042 4.19564 13.0999 5.79401 13.0999C6.56158 13.0999 7.29771 12.795 7.84046 12.2522L12.4463 7.64635L13.1535 8.35346L8.54757 12.9593C7.81728 13.6896 6.8268 14.0999 5.79401 14.0999C3.64336 14.0999 1.8999 12.3564 1.8999 10.2058C1.8999 9.17301 2.31017 8.18252 3.04046 7.45224L7.78361 2.70909Z"
            />
          </svg><span>{{ $t("status.copy_link") }}</span>
        </button>
        <a
          v-if="!status.is_local"
          class="button-default dropdown-item dropdown-item-icon"
          title="Source"
          :href="status.external_url"
          target="_blank"
        >
          <i
            style="display:inline-block;vertical-align:middle;cursor:pointer;margin-left:4px;margin-right:4px;font-size:16px;"
            class="las la-external-link-alt"
          /><span>{{ $t("status.external_source") }}</span>
        </a>
        <button
          class="button-default dropdown-item dropdown-item-icon"
          @click.prevent="reportStatus"
          @click="close"
        >
          <i
            style="display:inline-block;vertical-align:middle;cursor:pointer;margin-left:4px;margin-right:4px;font-size:16px;"
            class="las la-flag"
          /><span>{{ $t("user_card.report") }}</span>
        </button>
      </div>
    </template>
    <template #trigger>
      <button class="button-unstyled popover-trigger">
        <svg
          slot="trigger"
          class="popover-trigger"
          style="display:inline-block;cursor:pointer;"
          color="var(--Text)"
          width="16px"
          height="16px"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 7H4V9H2V7ZM7 7H9V9H7V7ZM14 7H12V9H14V7Z"
          />
        </svg>
      </button>
    </template>
  </Popover>
</template>

<script src="./extra_buttons.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.ExtraButtons {
  /* override of popover internal stuff */
  .popover-trigger-button {
    width: auto;
  }

  .popover-trigger {
    position: static;
    padding: 10px;
    margin: -10px;
  }
}
</style>
