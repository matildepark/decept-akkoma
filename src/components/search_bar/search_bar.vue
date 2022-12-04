<template>
  <div
    class="SearchBar"
    :class="{ '-expanded': !hidden }"
  >
    <button
      v-if="hidden"
      class="button-unstyled nav-icon"
      :title="$t('nav.search')"
      type="button"
      @click.prevent.stop="toggleHidden"
    >
      <svg
        style="display:inline-block;vertical-align:middle;"
        stroke="var(--topBarLink,#d8a070)"
        width="16px"
        height="16px"
        @click.prevent.stop="toggleHidden"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 7.5C11 9.433 9.433 11 7.5 11C5.567 11 4 9.433 4 7.5C4 5.567 5.567 4 7.5 4C9.433 4 11 5.567 11 7.5ZM10.3088 11.016C9.53901 11.6318 8.56251 12 7.5 12C5.01472 12 3 9.98528 3 7.5C3 5.01472 5.01472 3 7.5 3C9.98528 3 12 5.01472 12 7.5C12 8.56251 11.6318 9.53901 11.016 10.3088L13.3536 12.6464L12.6464 13.3536L10.3088 11.016Z"
        />
      </svg>
    </button>
    <template v-else>
      <input
        id="search-bar-input"
        ref="searchInput"
        v-model="searchTerm"
        class="search-bar-input"
        :placeholder="$t('nav.search')"
        type="text"
        @keyup.enter="find(searchTerm)"
      >
      <button
        class="button-default search-button"
        type="submit"
        style="align-self: center;"
        @click="find(searchTerm)"
      >
        Search
      </button>
      <button
        class="button-unstyled cancel-search"
        style="height: fit-content;padding-top:5px;padding-bottom:5px;"
        type="button"
        @click.prevent.stop="toggleHidden"
      >
        <svg
          style="display:inline-block;vertical-align:middle;margin-left:0.5rem;margin-right: 0.5rem;"
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
      </button>
    </template>
  </div>
</template>

<script src="./search_bar.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.SearchBar {
  display: inline-flex;
  align-items: baseline;
  vertical-align: baseline;
  justify-content: flex-end;

  &.-expanded {
    width: 100%;
  }

  .search-bar-input,
  .search-button {
    height: 29px;
  }

  .search-bar-input {
    flex: 1 0 auto;
    margin-left: 0.5em;
  }

  .cancel-search {
    height: 50px;
  }

  .cancel-icon {
    color: $fallback--text;
    color: var(--btnTopBarText, $fallback--text);
  }
}

</style>
