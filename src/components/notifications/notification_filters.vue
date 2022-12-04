<template>
  <Popover
    trigger="click"
    class="NotificationFilters"
    placement="bottom"
    :bound-to="{ x: 'container' }"
  >
    <template v-slot:content>
      <div class="dropdown-menu">
        <button
          class="button-default dropdown-item"
          @click="toggleNotificationFilter('likes')"
        >
          <span
            class="menu-checkbox"
            :class="{ 'menu-checkbox-checked': filters.likes }"
          />{{ $t('settings.notification_visibility_likes') }}
        </button>
        <button
          class="button-default dropdown-item"
          @click="toggleNotificationFilter('repeats')"
        >
          <span
            class="menu-checkbox"
            :class="{ 'menu-checkbox-checked': filters.repeats }"
          />{{ $t('settings.notification_visibility_repeats') }}
        </button>
        <button
          class="button-default dropdown-item"
          @click="toggleNotificationFilter('follows')"
        >
          <span
            class="menu-checkbox"
            :class="{ 'menu-checkbox-checked': filters.follows }"
          />{{ $t('settings.notification_visibility_follows') }}
        </button>
        <button
          class="button-default dropdown-item"
          @click="toggleNotificationFilter('mentions')"
        >
          <span
            class="menu-checkbox"
            :class="{ 'menu-checkbox-checked': filters.mentions }"
          />{{ $t('settings.notification_visibility_mentions') }}
        </button>
        <button
          class="button-default dropdown-item"
          @click="toggleNotificationFilter('emojiReactions')"
        >
          <span
            class="menu-checkbox"
            :class="{ 'menu-checkbox-checked': filters.emojiReactions }"
          />{{ $t('settings.notification_visibility_emoji_reactions') }}
        </button>
        <button
          class="button-default dropdown-item"
          @click="toggleNotificationFilter('moves')"
        >
          <span
            class="menu-checkbox"
            :class="{ 'menu-checkbox-checked': filters.moves }"
          />{{ $t('settings.notification_visibility_moves') }}
        </button>
        <button
          class="button-default dropdown-item"
          @click="toggleNotificationFilter('polls')"
        >
          <span
            class="menu-checkbox"
            :class="{ 'menu-checkbox-checked': filters.polls }"
          />{{ $t('settings.notification_visibility_polls') }}
        </button>
      </div>
    </template>
    <template v-slot:trigger>
      <button class="filter-trigger-button button-unstyled">
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

<script>
import Popover from '../popover/popover.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

library.add(
  faFilter
)

export default {
  components: { Popover },
  computed: {
    filters () {
      return this.$store.getters.mergedConfig.notificationVisibility
    }
  },
  methods: {
    toggleNotificationFilter (type) {
      this.$store.dispatch('setOption', {
        name: 'notificationVisibility',
        value: {
          ...this.filters,
          [type]: !this.filters[type]
        }
      })
    }
  }
}
</script>

<style lang="scss">

.NotificationFilters {
  align-self: stretch;

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
