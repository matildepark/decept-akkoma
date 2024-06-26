<template>
  <div
    class="MobileNav"
  >
    <nav
      id="nav"
      class="mobile-nav"
      @click="scrollToTop()"
    >
      <div class="item">
        <button
          class="button-unstyled mobile-nav-button"
          @click.stop.prevent="toggleMobileSidebar()"
        >
          <svg
            fill="var(--topBarLink)"
            style="margin-top:16px;"
            height="16px"
            width="16px"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 8.5H2V7.5H14V8.5Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 2.5H14V3.5H2V2.5Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 13.5H2V12.5H14V13.5Z"
            />
          </svg>
          <div
            v-if="unreadAnnouncementCount"
            class="alert-dot"
          />
        </button>
      </div>
      <div class="item right">
        <button
          v-if="currentUser"
          class="button-unstyled mobile-nav-button"
          @click.stop.prevent="openMobileNotifications()"
        >
          <i
            class="las la-bell"
            style="color: var(--topBarLink,#d8a070)"
          />
          <div
            v-if="unseenNotificationsCount"
            class="alert-dot"
          />
        </button>
      </div>
    </nav>
    <div
      v-if="currentUser"
      class="mobile-notifications-drawer"
      :class="{ '-closed': !notificationsOpen }"
      @touchstart.stop="notificationsTouchStart"
      @touchmove.stop="notificationsTouchMove"
    >
      <div class="mobile-notifications-header">
        <span class="title">{{ $t('notifications.notifications') }}</span>
        <a
          class="mobile-nav-button"
          @click.stop.prevent="closeMobileNotifications()"
        >
          <svg
            style="margin-left:0.5rem;margin-right: 0.5rem;"
            stroke="var(--topBarLink,#d8a070)"
            width="16px"
            height="16px"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.29289 7.99995L3.75747 11.5354L4.46458 12.2425L8 8.70706L11.5355 12.2426L12.2426 11.5355L8.70711 7.99995L12.2428 4.46431L11.5356 3.7572L8 7.29285L4.46443 3.75728L3.75732 4.46438L7.29289 7.99995Z"
            />
          </svg>
        </a>
      </div>
      <div
        id="mobile-notifications"
        class="mobile-notifications"
        @scroll="onScroll"
      />
    </div>
    <SideDrawer
      ref="sideDrawer"
      :logout="logout"
    />
    <teleport to="#modal">
      <confirm-modal
        v-if="showingConfirmLogout"
        :title="$t('login.logout_confirm_title')"
        :confirm-text="$t('login.logout_confirm_accept_button')"
        :cancel-text="$t('login.logout_confirm_cancel_button')"
        @accepted="doLogout"
        @cancelled="hideConfirmLogout"
      >
        {{ $t('login.logout_confirm') }}
      </confirm-modal>
    </teleport>
  </div>
</template>

<script src="./mobile_nav.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.MobileNav {
  .mobile-nav {
    display: grid;
    line-height: var(--navbar-height);
    grid-template-rows: 50px;
    grid-template-columns: 2fr auto;
    width: 100%;
    box-sizing: border-box;
    a {
      color: var(--topBarLink, $fallback--link);
    }
  }

  .mobile-inner-nav {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .mobile-nav-button {
    display: inline-block;
    text-align: center;
    padding: 0 1em;
    position: relative;
    cursor: pointer;
  }

  .site-name {
    padding: 0 .3em;
    display: inline-block;
  }

  .item {
    /* moslty just to get rid of extra whitespaces */
    display: flex;
  }

  .alert-dot {
    border-radius: 100%;
    height: 8px;
    width: 8px;
    position: absolute;
    left: calc(50% - 4px);
    top: calc(50% - 4px);
    margin-left: 6px;
    margin-top: -6px;
    background-color: $fallback--cRed;
    background-color: var(--badgeNotification, $fallback--cRed);
  }

  .mobile-notifications-drawer {
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 1px 1px 4px rgba(0,0,0,.6);
    box-shadow: var(--panelShadow);
    transition-property: transform;
    transition-duration: 0.25s;
    @media (prefers-reduced-motion: reduce) {
      transition: unset;
    }
    transform: translateX(0);
    z-index: 1001;
    -webkit-overflow-scrolling: touch;

    &.-closed {
      transform: translateX(100%);
      box-shadow: none;
    }
  }

  .mobile-notifications-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    color: var(--topBarText);
    background-color: $fallback--fg;
    background-color: var(--topBar, $fallback--fg);
    box-shadow: 0px 0px 4px rgba(0,0,0,.6);
    box-shadow: var(--topBarShadow);

    .title {
      font-size: 1.3em;
      margin-left: 0.6em;
    }
  }

  .mobile-notifications {
    margin-top: 50px;
    width: 100vw;
    height: calc(100vh - var(--navbar-height));
    overflow-x: hidden;
    overflow-y: scroll;

    color: $fallback--text;
    color: var(--text, $fallback--text);
    background-color: $fallback--bg;
    background-color: var(--bg, $fallback--bg);

    .notifications {
      padding: 0;
      border-radius: 0;
      box-shadow: none;
      .panel {
        border-radius: 0;
        margin: 0;
        box-shadow: none;
      }
      .panel:after {
        border-radius: 0;
      }
      .panel .panel-heading {
        border-radius: 0;
        box-shadow: none;
      }
    }
  }
  .confirm-modal.dark-overlay {
    &::before {
      z-index: 3000;
    }
    .dialog-modal.panel {
      z-index: 3001;
    }
  }
}

</style>
