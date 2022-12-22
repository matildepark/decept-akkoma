<template>
  <div class="emoji-reactions">
    <UserListPopover
      v-for="(reaction) in emojiReactions"
      :key="reaction.url || reaction.name"
      :users="accountsForEmoji[reaction.url || reaction.name]"
    >
      <button
        class="emoji-reaction btn button-default"
        :class="{ 'picked-reaction': reactedWith(reaction.name), 'not-clickable': !loggedIn }"
        @click="emojiOnClick(reaction.name, $event)"
        @mouseenter="fetchEmojiReactionsByIfMissing()"
      >
        <span
          v-if="(reaction.url !== null && reaction.url !== undefined)"
        >
          <img
            :src="reaction.url"
            :title="reaction.name"
            class="reaction-emoji"
            width="1.55em"
          >
          {{ reaction.count }}
        </span>
        <span v-else>
          <span class="reaction-emoji unicode-emoji">
            {{ reaction.name }}
          </span>
          <span>{{ reaction.count }}</span>
        </span>
      </button>
    </UserListPopover>
    <a
      v-if="tooManyReactions"
      class="emoji-reaction-expand faint"
      href="javascript:void(0)"
      @click="toggleShowAll"
    >
      {{ showAll ? $t('general.show_less') : showMoreString }}
    </a>
  </div>
</template>

<script src="./emoji_reactions.js" ></script>
<style lang="scss">
@import '../../_variables.scss';

.emoji-reactions {
  display: flex;
  margin-top: 0.25em;
  flex-wrap: wrap;
}

.unicode-emoji {
  font-size: 100%;
}

.emoji-reaction {
  border: 1px solid $fallback--fg !important;
  box-shadow: none !important;
  padding: 0 0.5em;
  margin-right: 0.5em;
  margin-top: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  span {
    display: flex;
  align-items: center;
  justify-content: center;

  }
  .reaction-emoji {
    width: 1.55em !important;
    margin-right: 0.25em;
  }
  &:hover {
    box-shadow: var(--inputShadow) !important;
  }
  &:focus {
    outline: none;
  }

  &.not-clickable {
    cursor: default;
    &:hover {
      box-shadow: $fallback--buttonShadow;
      box-shadow: var(--buttonShadow);
    }
  }
}

.emoji-reaction-expand {
  padding: 0 0.5em;
  margin-right: 0.5em;
  margin-top: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    text-decoration: underline;
  }
}

.button-default.picked-reaction {
  margin-left: -1px; // offset the border, can't use inset shadows either
  margin-right: calc(0.5em - 1px);
}

</style>
