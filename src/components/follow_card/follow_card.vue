<template>
  <basic-user-card :user="user">
    <div class="follow-card-content-container">
      <span
        v-if="isMe || (!noFollowsYou && relationship.followed_by)"
        class="faint"
      >
        {{ isMe ? $t('user_card.its_you') : null }}
      </span>
      <template v-if="!loggedIn">
        <div
          v-if="!relationship.following"
          class="follow-card-follow-button"
        >
          <RemoteFollow :user="user" />
        </div>
      </template>
      <template v-else-if="!isMe">
        <FollowButton
          :relationship="relationship"
          :label-following="$t('user_card.follow_unfollow')"
          class="follow-card-follow-button"
          :user="user"
        />
        <RemoveFollowerButton
          v-if="noFollowsYou && relationship.followed_by"
          :relationship="relationship"
          class="follow-card-button"
        />
      </template>
    </div>
  </basic-user-card>
</template>

<script src="./follow_card.js"></script>

<style lang="scss">
.follow-card {
  &-content-container {
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    line-height: 1.5em;
  }

  &-button {
    margin-top: 0.5em;
    padding: 0 1.5em;
    margin-left: 1em;
  }

  &-follow-button {
    margin-top: 0.5em;
    margin-left: auto;
    width: 10em;
  }
}
</style>
