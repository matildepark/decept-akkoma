<template>
  <Popover
    trigger="click"
    class="TimelineQuickSettings"
    :bound-to="{ x: 'container' }"
  >
    <template #content>
      <div class="dropdown-menu">
        <div v-if="loggedIn">
          <button
            class="button-default dropdown-item"
            @click="replyVisibilityAll = true"
          >
            <span
              class="menu-checkbox -radio"
              :class="{ 'menu-checkbox-checked': replyVisibilityAll }"
            />{{ $t('settings.reply_visibility_all') }}
          </button>
          <button
            class="button-default dropdown-item"
            @click="replyVisibilityFollowing = true"
          >
            <span
              class="menu-checkbox -radio"
              :class="{ 'menu-checkbox-checked': replyVisibilityFollowing }"
            />{{ $t('settings.reply_visibility_following_short') }}
          </button>
          <button
            class="button-default dropdown-item"
            @click="replyVisibilitySelf = true"
          >
            <span
              class="menu-checkbox -radio"
              :class="{ 'menu-checkbox-checked': replyVisibilitySelf }"
            />{{ $t('settings.reply_visibility_self_short') }}
          </button>
          <div
            role="separator"
            class="dropdown-divider"
          />
        </div>
        <button
          class="button-default dropdown-item"
          @click="muteBotStatuses = !muteBotStatuses"
        >
          <span
            class="menu-checkbox"
            :class="{ 'menu-checkbox-checked': muteBotStatuses }"
          />{{ $t('settings.mute_bot_posts') }}
        </button>
        <button
          class="button-default dropdown-item"
          @click="hideMedia = !hideMedia"
        >
          <span
            class="menu-checkbox"
            :class="{ 'menu-checkbox-checked': hideMedia }"
          />{{ $t('settings.hide_media_previews') }}
        </button>
        <button
          class="button-default dropdown-item"
          @click="hideMutedPosts = !hideMutedPosts"
        >
          <span
            class="menu-checkbox"
            :class="{ 'menu-checkbox-checked': hideMutedPosts }"
          />{{ $t('settings.hide_all_muted_posts') }}
        </button>
        <button
          class="button-default dropdown-item dropdown-item-icon"
          @click="openTab('filtering')"
        >
          <FAIcon icon="font" />{{ $t('settings.word_filter') }}
        </button>
        <button
          class="button-default dropdown-item dropdown-item-icon"
          @click="openTab('general')"
        >
          <FAIcon icon="wrench" />{{ $t('settings.more_settings') }}
        </button>
      </div>
    </template>
    <template #trigger>
      <button class="button-unstyled">
        <svg
          style="display:inline-block;vertical-align:middle;"
          fill="var(--topBarLink,#d8a070)"
          width="16px"
          height="16px"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.1 8.35989L4.1 2H5.1L5.1 8.35989C6.0184 8.5842 6.7 9.4125 6.7 10.4C6.7 11.3875 6.0184 12.2158 5.1 12.4401V14H4.1V12.4401C3.1816 12.2158 2.5 11.3875 2.5 10.4C2.5 9.4125 3.1816 8.5842 4.1 8.35989ZM10.5 3.55989L10.5 2H11.5L11.5 3.55989C12.4184 3.7842 13.1 4.6125 13.1 5.6C13.1 6.5875 12.4184 7.4158 11.5 7.64011V14H10.5V7.64011C9.5816 7.4158 8.9 6.5875 8.9 5.6C8.9 4.6125 9.5816 3.7842 10.5 3.55989ZM11 4.5C10.3925 4.5 9.9 4.99249 9.9 5.6C9.9 6.20751 10.3925 6.7 11 6.7C11.6075 6.7 12.1 6.20751 12.1 5.6C12.1 4.99249 11.6075 4.5 11 4.5ZM4.6 9.3C3.99249 9.3 3.5 9.79249 3.5 10.4C3.5 11.0075 3.99249 11.5 4.6 11.5C5.20751 11.5 5.7 11.0075 5.7 10.4C5.7 9.79249 5.20751 9.3 4.6 9.3Z"
          />
        </svg>
      </button>
    </template>
  </Popover>
</template>

<script src="./timeline_quick_settings.js"></script>

<style lang="scss">

.TimelineQuickSettings {

  > button {
    line-height: 100%;
    height: 100%;
    width: var(--__panel-heading-height-inner);
    text-align: center;

    svg {
      font-size: 1.2em;
    }
  }
}

</style>
