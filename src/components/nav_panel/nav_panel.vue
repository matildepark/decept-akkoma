<template>
  <div class="NavPanel">
    <div class="panel panel-default">
      <ul style="text-align:right;">
        <li v-if="currentUser || !privateMode">
          <button
            class="button-unstyled menu-item"
            style="margin: 0;text-align:right;"
            @click="toggleTimelines"
          >
            {{ $t("nav.timelines") }}
          </button>
          <div
            v-show="showTimelines"
            class="timelines-background"
          >
            <TimelineMenuContent class="timelines" />
          </div>
        </li>
        <li v-if="currentUser">
          <router-link
            class="menu-item"
            :to="{ name: 'lists' }"
          >
            {{ $t("nav.lists") }}
          </router-link>
        </li>
        <li v-if="currentUser">
          <router-link
            class="menu-item"
            :to="{ name: 'interactions', params: { username: currentUser.screen_name } }"
          >
            {{ $t("nav.interactions") }}
          </router-link>
        </li>
        <li v-if="currentUser && currentUser.locked">
          <router-link
            class="menu-item"
            :to="{ name: 'friend-requests' }"
          >
            {{ $t("nav.friend_requests") }}
            <span
              v-if="followRequestCount > 0"
              class="badge badge-notification"
            >
              {{ followRequestCount }}
            </span>
          </router-link>
        </li>
        <li>
          <router-link
            class="menu-item"
            :to="{ name: 'about' }"
          >
            {{ $t("nav.about") }}
          </router-link>
        </li>
        <li v-if="currentUser">
          <router-link
            class="menu-item"
            :to="{ name: 'announcements' }"
          >
            {{ $t('nav.announcements') }}
            <span
              v-if="unreadAnnouncementCount > 0"
              class="badge badge-notification"
            >
              {{ unreadAnnouncementCount }}
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./nav_panel.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.NavPanel {
  margin: 0;
  .panel-default {
    margin: 0;
  }
  .panel {
    overflow: hidden;
    box-shadow: var(--panelShadow);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    position: relative;
    border-bottom: 1px solid;
    border-color: $fallback--border;
    border-color: var(--border, $fallback--border);
    padding: 0;

    &:first-child .menu-item {
      border-top-right-radius: $fallback--panelRadius;
      border-top-right-radius: var(--panelRadius, $fallback--panelRadius);
      border-top-left-radius: $fallback--panelRadius;
      border-top-left-radius: var(--panelRadius, $fallback--panelRadius);
    }

    &:last-child .menu-item {
      border-bottom-right-radius: $fallback--panelRadius;
      border-bottom-right-radius: var(--panelRadius, $fallback--panelRadius);
      border-bottom-left-radius: $fallback--panelRadius;
      border-bottom-left-radius: var(--panelRadius, $fallback--panelRadius);
    }
  }

  li:last-child {
    border: none;
  }

  .menu-item {
    display: block;
    box-sizing: border-box;
    line-height: 2.5em;
    padding: 0 1em;
    width: 100%;
    color: $fallback--link;
    color: var(--link, $fallback--link);

    &:hover {
      background-color: $fallback--lightBg;
      background-color: var(--selectedMenu, $fallback--lightBg);
      color: $fallback--link;
      color: var(--selectedMenuText, $fallback--link);
      --faint: var(--selectedMenuFaintText, $fallback--faint);
      --faintLink: var(--selectedMenuFaintLink, $fallback--faint);
      --lightText: var(--selectedMenuLightText, $fallback--lightText);
      --icon: var(--selectedMenuIcon, $fallback--icon);
    }

    &.router-link-active {
      font-weight: bolder;
      background-color: $fallback--lightBg;
      background-color: var(--selectedMenu, $fallback--lightBg);
      color: $fallback--text;
      color: var(--selectedMenuText, $fallback--text);
      --faint: var(--selectedMenuFaintText, $fallback--faint);
      --faintLink: var(--selectedMenuFaintLink, $fallback--faint);
      --lightText: var(--selectedMenuLightText, $fallback--lightText);
      --icon: var(--selectedMenuIcon, $fallback--icon);

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .timelines-chevron {
    margin-left: 0.8em;
    font-size: 1.1em;
  }

  .timelines-background {
    padding: 0 0.6rem 0 0;
    background-color: $fallback--lightBg;
    background-color: var(--selectedMenu, $fallback--lightBg);
    border-top: 1px solid;
    border-color: $fallback--border;
    border-color: var(--border, $fallback--border);
  }

  .timelines {
    background-color: $fallback--bg;
    background-color: var(--bg, $fallback--bg);
  }

  .fa-scale-110 {
    margin-right: 0.8em;
  }

  .badge {
    position: absolute;
    right: 0.6rem;
    top: 1.25em;
  }
}
</style>
