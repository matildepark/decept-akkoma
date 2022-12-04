<template>
  <div
    v-if="!showNothing"
    class="ScopeSelector"
  >
    <button
      v-if="showDirect"
      class="button-unstyled scope"
      :class="css.direct"
      :title="$t('post_status.scope.direct')"
      type="button"
      @click="changeVis('direct')"
    >
      <i
        class="las la-at"
        style="font-size: 16px;"
      />
    </button>
    {{ ' ' }}
    <button
      v-if="showPrivate"
      class="button-unstyled scope"
      :class="css.private"
      :title="$t('post_status.scope.private')"
      type="button"
      @click="changeVis('private')"
    >
      <i
        class="las la-lock"
        style="font-size: 16px;"
      />
    </button>
    {{ ' ' }}
    <button
      v-if="showUnlisted"
      class="button-unstyled scope"
      :class="css.unlisted"
      :title="$t('post_status.scope.unlisted')"
      type="button"
      @click="changeVis('unlisted')"
    >
      <i
        class="las la-lock-open"
        style="font-size: 16px;"
      />
    </button>
    {{ ' ' }}
    <button
      v-if="showPublic"
      class="button-unstyled scope"
      :class="css.public"
      :title="$t('post_status.scope.public')"
      type="button"
      @click="changeVis('public')"
    >
      <i
        class="las la-globe-americas"
        style="font-size: 16px;"
      />
    </button>
    {{ ' ' }}
    <button
      v-if="showLocal"
      class="button-unstyled scope"
      :class="css.local"
      :title="$t('post_status.scope.local')"
      type="button"
      @click="changeVis('local')"
    >
      <i
        class="las la-users"
        style="font-size: 16px;"
      />
    </button>
  </div>
</template>

<script src="./scope_selector.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.ScopeSelector {

  .scope {
    display: inline-block;
    cursor: pointer;
    min-width: 1.3em;
    min-height: 1.3em;
    text-align: center;

    i {
       color: $fallback--lightText;
     }

     &.selected i {
       color: darken($fallback--lightText, 50%);
     }
  }
}
</style>
