<template>
  <nav
    id="nav"
    class="DesktopNav"
    :class="{ '-logoLeft': logoLeft }"
    @click="scrollToTop()"
  >
    <div
      class="inner-nav"
      :class="{ '-wide': showWiderShortcuts }"
    >
      <router-link
        class="logo"
        :to="{ name: 'root' }"
        :style="logoBgStyle"
      >
        <div
          class="mask"
          :style="logoMaskStyle"
        />
        <img
          :src="logo"
          :style="logoStyle"
        >
      </router-link>
      <div class="item right actions">
        <search-bar
          v-if="currentUser || !privateMode"
          @toggled="onSearchBarToggled"
          @click.stop
        />
        <button
          class="button-unstyled nav-icon"
          @click.stop="openSettingsModal"
        >
          <svg
            style="display:inline-block;vertical-align:middle;"
            stroke="var(--topBarLink,#d8a070)"
            width="16px"
            height="16px"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.16271 3.76511L4.90354 2.81793C4.54968 3.02032 4.21841 3.25634 3.91432 3.5215L4.43733 4.95812C4.55802 5.28965 4.30665 5.63852 3.95397 5.62899L2.37764 5.58635C2.21487 5.94798 2.08756 6.3283 2 6.72309L3.28659 7.58453C3.58236 7.78256 3.58236 8.21744 3.28659 8.41547L2 9.27691C2.08756 9.6717 2.21487 10.052 2.37764 10.4136L3.95397 10.371C4.30665 10.3615 4.55802 10.7104 4.43733 11.0419L3.91432 12.4785C4.21841 12.7437 4.54968 12.9797 4.90354 13.1821L6.16271 12.2349C6.44057 12.0259 6.84165 12.1573 6.942 12.4902L7.38826 13.9706C7.58947 13.99 7.79355 14 8 14C8.20645 14 8.41053 13.99 8.61174 13.9706L9.058 12.4902C9.15835 12.1573 9.55943 12.0259 9.8373 12.2349L11.0965 13.1821C11.4503 12.9797 11.7816 12.7437 12.0857 12.4785L11.5627 11.0419C11.442 10.7104 11.6933 10.3615 12.046 10.371L13.6224 10.4136C13.7851 10.052 13.9124 9.6717 14 9.27691L12.7134 8.41547C12.4176 8.21744 12.4176 7.78256 12.7134 7.58453L14 6.72309C13.9124 6.3283 13.7851 5.94798 13.6224 5.58636L12.046 5.62899C11.6933 5.63852 11.442 5.28965 11.5627 4.95812L12.0857 3.5215C11.7816 3.25634 11.4503 3.02032 11.0965 2.81793L9.8373 3.76511C9.55943 3.97412 9.15835 3.84274 9.058 3.50984L8.61174 2.02941C8.41053 2.00996 8.20645 2 8 2C7.79355 2 7.58947 2.00996 7.38826 2.02941L6.942 3.50984C6.84165 3.84274 6.44057 3.97412 6.16271 3.76511ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
            />
          </svg>
        </button>
        <button
          v-if="currentUser && currentUser.role === 'admin' || currentUser.role === 'moderator'"
          class="button-unstyled nav-icon"
          @click.stop="openModModal"
        >
          <i class="las la-tasks" style="color: var(--topBarLink, #d8a070); font-size: 16px; vertical-align: middle;"></i>
        </button>
        <a
          v-if="currentUser && currentUser.role === 'admin'"
          href="/pleroma/admin/#/login-pleroma"
          class="nav-icon"
          target="_blank"
          @click.stop
        >
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
        </a>
      </div>
    </div>
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
  </nav>
</template>
<script src="./desktop_nav.js"></script>

<style src="./desktop_nav.scss" lang="scss"></style>
