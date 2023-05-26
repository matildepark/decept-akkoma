<template>
  <div class="sidebar">
    <instance-specific-panel v-if="showInstanceSpecificPanel" />
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="tos-content spiral" style="margin:0rem !important;padding:1rem; background: var(--panel, #000000); color: var(--paneltext, #fff);">
          <img
            src="/static/spiral2_transparent.png"
            style="display:block;text-align:center;margin:1rem auto; max-width: 100%;"
          >
        </div>
      </div>
    </div>
    <staff-panel />
    <terms-of-service-panel />
    <features-panel v-if="showFeaturesPanel" />
  </div>
</template>

<script src="./about.js"></script>

<style lang="scss">
</style>
