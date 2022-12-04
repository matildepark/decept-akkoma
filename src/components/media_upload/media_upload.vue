<template>
  <label
    class="media-upload"
    :class="{ disabled: disabled }"
    :title="$t('tool_tip.media_upload')"
  >
    <FAIcon
      v-if="uploading"
      class="progress-icon"
      icon="circle-notch"
      spin
    />
    <svg
      v-if="!uploading"
      fill="var(--Text)"
      height="16px"
      width="16px"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2071 1.5L13.5 4.7929V14.5H2.5L2.50011 1.50013L10.2071 1.5ZM3.5001 2.50012L3.50001 13.5H12.5V5.5H9.5V2.50001L3.5001 2.50012ZM10.5 3.20711V4.5H11.7929L10.5 3.20711Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 8V6.5H8.5V8H10V9H8.5V10.5H7.5V9H6V8H7.5Z"
      />
    </svg>
    <input
      v-if="uploadReady"
      class="hidden-input-file"
      :disabled="disabled"
      type="file"
      multiple="true"
      @change="change"
    >
  </label>
</template>

<script src="./media_upload.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.media-upload {
  cursor: pointer; // We use <label> for interactivity... i wonder if it's fine

  .hidden-input-file {
    display: none;
  }
}
 </style>
