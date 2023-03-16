<template>
  <div
    class="user-card"
    :class="classes"
  >
    <div
      :class="{ 'hide-bio': hideBio }"
      :style="style"
      class="background-image"
    />
    <div class="panel-heading -flexible-height">
      <div class="user-info">
        <div class="container">
          <a
            v-if="allowZoomingAvatar"
            class="user-info-avatar-link"
            @click="zoomAvatar"
          >
            <UserAvatar
              :better-shadow="betterShadow"
              :user="user"
            />
            <div class="user-info-avatar-link-overlay">
              <i
                class="las la-search-plus"
                style="font-size: 1.2rem;"
              />
            </div>
          </a>
          <router-link
            v-else
            :to="userProfileLink(user)"
          >
            <UserAvatar
              :better-shadow="betterShadow"
              :user="user"
            />
          </router-link>
          <div class="user-summary">
            <div class="top-line">
              <RichContent
                :title="user.name"
                class="user-name"
                :html="user.name"
                :emoji="user.emoji"
              />
              <button
                v-if="!isOtherUser && user.is_local"
                class="button-unstyled edit-profile-button"
                @click.stop="openProfileTab"
              >
                <i
                  class="las la-edit"
                  style="font-size: 16px;"
                />
              </button>
              <a
                v-if="isOtherUser && !user.is_local"
                :href="user.statusnet_profile_url"
                target="_blank"
                class="button-unstyled external-link-button"
              >
                <svg
                  style="display:inline-block;vertical-align:middle;cursor:pointer;margin-left:4px;margin-right:4px;"
                  width="16px"
                  height="16px"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.78361 2.70909C8.30172 2.19097 9.00444 1.8999 9.73716 1.8999C11.263 1.8999 12.4999 3.13682 12.4999 4.66264C12.4999 5.39537 12.2088 6.09808 11.6907 6.6162L7.08483 11.2221C6.77888 11.528 6.36394 11.6999 5.93127 11.6999C5.03029 11.6999 4.2999 10.9695 4.2999 10.0685C4.2999 9.63587 4.47178 9.22092 4.77772 8.91498L9.24635 4.44635L9.95345 5.15346L5.48483 9.62209C5.36642 9.74049 5.2999 9.90108 5.2999 10.0685C5.2999 10.4172 5.58258 10.6999 5.93127 10.6999C6.09872 10.6999 6.25931 10.6334 6.37772 10.515L10.9836 5.90909C11.3142 5.57851 11.4999 5.13015 11.4999 4.66264C11.4999 3.68911 10.7107 2.8999 9.73716 2.8999C9.26965 2.8999 8.82129 3.08562 8.49071 3.4162L3.74757 8.15934C3.20482 8.7021 2.8999 9.43822 2.8999 10.2058C2.8999 11.8042 4.19564 13.0999 5.79401 13.0999C6.56158 13.0999 7.29771 12.795 7.84046 12.2522L12.4463 7.64635L13.1535 8.35346L8.54757 12.9593C7.81728 13.6896 6.8268 14.0999 5.79401 14.0999C3.64336 14.0999 1.8999 12.3564 1.8999 10.2058C1.8999 9.17301 2.31017 8.18252 3.04046 7.45224L7.78361 2.70909Z"
                  />
                </svg>
              </a>
              <a
                v-if="isOtherUser"
                :href="user.statusnet_profile_url + '.rss'"
                target="_blank"
                class="button-unstyled external-link-button"
              >
                <i class="las la-rss" />
              </a>
              <AccountActions
                v-if="isOtherUser && loggedIn"
                :user="user"
                :relationship="relationship"
              />
            </div>
            <div class="bottom-line">
              <router-link
                class="user-screen-name"
                :title="user.screen_name_ui"
                :to="userProfileLink(user)"
              >
                @{{ user.screen_name_ui }}
              </router-link>
              <template v-if="!hideBio">
                <span
                  v-if="user.deactivated"
                  class="alert user-role"
                >
                  {{ $t('user_card.deactivated') }}
                </span>
                <span
                  v-if="!!visibleRole"
                  class="alert user-role"
                >
                  {{ $t(`general.role.${visibleRole}`) }}
                </span>
                <span
                  v-if="user.bot"
                  class="alert user-role"
                >
                  {{ $t('user_card.bot') }}
                </span>
              </template>
              <span v-if="user.locked">
                <FAIcon
                  class="lock-icon"
                  icon="lock"
                  size="sm"
                />
              </span>
              <span
                v-if="!mergedConfig.hideUserStats && !hideBio"
                class="dailyAvg"
              >{{ dailyAvg }} {{ $t('user_card.per_day') }}</span>
            </div>
          </div>
        </div>
        <div class="user-meta">
          <div
            v-if="relationship.blocked_by && loggedIn && isOtherUser"
            class="blocking"
          >
            {{ $t('user_card.blocks_you') }}
          </div>
          <div
            v-if="relationship.followed_by && loggedIn && isOtherUser"
            class="following"
          />
          <div
            v-if="relationship.requested_by && loggedIn && isOtherUser"
            class="requested_by"
          >
            {{ $t('user_card.requested_by') }}
          </div>
          <div
            v-if="isOtherUser && (loggedIn || !switcher)"
            class="highlighter"
          >
            <!-- id's need to be unique, otherwise vue confuses which user-card checkbox belongs to -->
            <input
              v-if="userHighlightType !== 'disabled'"
              :id="'userHighlightColorTx'+user.id"
              v-model="userHighlightColor"
              class="userHighlightText"
              type="text"
            >
            <input
              v-if="userHighlightType !== 'disabled'"
              :id="'userHighlightColor'+user.id"
              v-model="userHighlightColor"
              class="userHighlightCl"
              type="color"
            >
            {{ ' ' }}
            <Select
              :id="'userHighlightSel'+user.id"
              v-model="userHighlightType"
              class="userHighlightSel"
            >
              <option value="disabled">
                {{ $t('user_card.highlight.disabled') }}
              </option>
              <option value="solid">
                {{ $t('user_card.highlight.solid') }}
              </option>
              <option value="striped">
                {{ $t('user_card.highlight.striped') }}
              </option>
              <option value="side">
                {{ $t('user_card.highlight.side') }}
              </option>
            </Select>
          </div>
        </div>
        <div
          v-if="loggedIn && isOtherUser"
          class="user-interactions"
        >
          <div class="btn-group">
            <FollowButton
              :relationship="relationship"
              :user="user"
              :disabled="relationship.blocked_by"
            />
            <template v-if="relationship.following">
              <ProgressButton
                v-if="!relationship.subscribing"
                class="btn button-default"
                :click="subscribeUser"
                :title="$t('user_card.subscribe')"
              >
                <FAIcon icon="bell" />
              </ProgressButton>
              <ProgressButton
                v-else
                class="btn button-default toggled"
                :click="unsubscribeUser"
                :title="$t('user_card.unsubscribe')"
              >
                <FALayers>
                  <FAIcon
                    icon="rss"
                    transform="left-5 shrink-6 up-3 rotate-20"
                    flip="horizontal"
                  />
                  <FAIcon
                    icon="rss"
                    transform="right-5 shrink-6 up-3 rotate-20"
                  />
                  <FAIcon icon="bell" />
                </FALayers>
              </ProgressButton>
            </template>
          </div>
          <div>
            <button
              v-if="relationship.muting"
              class="btn button-default btn-block toggled"
              :disabled="user.deactivated"
              @click="unmuteUser"
            >
              {{ $t('user_card.muted') }}
            </button>
            <button
              v-else
              class="btn button-default btn-block"
              :disabled="user.deactivated"
              @click="muteUser"
            >
              {{ $t('user_card.mute') }}
            </button>
          </div>
          <div>
            <button
              class="btn button-default btn-block"
              :disabled="user.deactivated"
              @click="mentionUser"
            >
              {{ $t('user_card.mention') }}
            </button>
          </div>
          <ModerationTools
            v-if="loggedIn.role === 'admin'"
            :user="user"
          />
        </div>
        <div
          v-if="!loggedIn && user.is_local"
          class="user-interactions"
        >
          <RemoteFollow :user="user" />
        </div>
      </div>
    </div>
    <div
      v-if="!hideBio"
      class="panel-body"
    >
      <div
        v-if="!mergedConfig.hideUserStats && switcher"
        class="user-counts"
      >
        <div
          class="user-count"
          @click.prevent="setProfileView('statuses')"
        >
          <h5>{{ $t('user_card.statuses') }}</h5>
          <span>{{ user.statuses_count }} <br></span>
        </div>
        <div
          class="user-count"
          @click.prevent="setProfileView('friends')"
        >
          <h5>{{ $t('user_card.followees') }}</h5>
          <span>{{ hideFollowsCount ? $t('user_card.hidden') : user.friends_count }}</span>
        </div>
        <div
          class="user-count"
          @click.prevent="setProfileView('followers')"
        >
          <h5>{{ $t('user_card.followers') }}</h5>
          <span>{{ hideFollowersCount ? $t('user_card.hidden') : user.followers_count }}</span>
        </div>
      </div>
      <RichContent
        v-if="!hideBio"
        class="user-card-bio"
        :html="user.description_html"
        :emoji="user.emoji"
        :handle-links="true"
      />
    </div>
    <teleport to="#modal">
      <confirm-modal
        v-if="showingConfirmMute"
        :title="$t('user_card.mute_confirm_title')"
        :confirm-text="$t('user_card.mute_confirm_accept_button')"
        :cancel-text="$t('user_card.mute_confirm_cancel_button')"
        @accepted="doMuteUser"
        @cancelled="hideConfirmMute"
      >
        <i18n-t
          keypath="user_card.mute_confirm"
          tag="span"
        >
          <template #user>
            <span
              v-text="user.screen_name_ui"
            />
          </template>
        </i18n-t>
      </confirm-modal>
    </teleport>
  </div>
</template>

<script src="./user_card.js"></script>

<style lang="scss" src="./user_card.scss" />
