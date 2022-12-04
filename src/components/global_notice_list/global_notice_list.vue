<template>
  <div class="global-notice-list">
    <div
      v-for="(notice, index) in notices"
      :key="index"
      class="alert global-notice"
      :class="{ ['global-' + notice.level]: true }"
    >
      <div class="notice-message">
        {{ $t(notice.messageKey, notice.messageArgs) }}
      </div>
      <button
        class="button-unstyled close-notice"
        @click="closeNotice(notice)"
      >
        <svg
          stroke="var(--Text,#000000"
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
    </div>
  </div>
</template>

<script src="./global_notice_list.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.global-notice-list {
  position: fixed;
  top: 50px;
  width: 100%;
  pointer-events: none;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;

  .global-notice {
    pointer-events: auto;
    text-align: center;
    width: 40em;
    max-width: calc(100% - 3em);
    display: flex;
    padding-left: 1.5em;
    line-height: 2;
    margin-bottom: 0.5em;

    .notice-message {
      flex: 1 1 100%;
    }
  }

  .global-error {
    background-color: var(--alertPopupError, $fallback--cRed);
    color: var(--alertPopupErrorText, $fallback--text);

    .svg-inline--fa {
      color: var(--alertPopupErrorText, $fallback--text);
    }
  }

  .global-warning {
    background-color: var(--alertPopupWarning, $fallback--cOrange);
    color: var(--alertPopupWarningText, $fallback--text);

    .svg-inline--fa {
      color: var(--alertPopupWarningText, $fallback--text);
    }
  }

  .global-success {
    background-color: var(--alertPopupSuccess, $fallback--cGreen);
    color: var(--alertPopupSuccessText, $fallback--text);
    .svg-inline--fa {
      color: var(--alertPopupSuccessText, $fallback--text);
    }
  }

  .global-info {
    background-color: var(--alertPopupNeutral, $fallback--fg);
    color: var(--alertPopupNeutralText, $fallback--text);
    .svg-inline--fa {
      color: var(--alertPopupNeutralText, $fallback--text);
    }
  }

  .close-notice {
    padding-right: 0.2em;
    .svg-inline--fa:hover {
      opacity: 0.6;
    }
  }
}
</style>
