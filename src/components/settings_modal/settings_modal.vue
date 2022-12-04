<template>
  <Modal
    :is-open="modalActivated"
    class="settings-modal"
    :class="{ peek: modalPeeked }"
    :no-background="modalPeeked"
  >
    <div class="settings-modal-panel panel">
      <div class="panel-heading">
        <span class="title">
          {{ $t('settings.settings') }}
        </span>
        <transition name="fade">
          <div
            v-if="currentSaveStateNotice"
            class="alert"
            :class="{ transparent: !currentSaveStateNotice.error, error: currentSaveStateNotice.error}"
            @click.prevent
          >
            {{ currentSaveStateNotice.error ? $t('settings.saving_err') : $t('settings.saving_ok') }}
          </div>
        </transition>
        <button
          class="btn button-default"
          :title="$t('general.peek')"
          @click="peekModal"
        >
          <FAIcon
            :icon="['far', 'window-minimize']"
            fixed-width
          />
        </button>
        <button
          class="btn button-default"
          :title="$t('general.close')"
          @click="closeModal"
        >
          <FAIcon
            icon="times"
            fixed-width
          />
        </button>
      </div>
      <div class="panel-body">
        <SettingsModalContent v-if="modalOpenedOnce" />
      </div>
      <div class="panel-footer settings-footer">
        <Popover
          class="export"
          trigger="click"
          placement="top"
          :offset="{ y: 5, x: 5 }"
          :bound-to="{ x: 'container' }"
          remove-padding
        >
          <template #trigger>
            <button
              class="btn button-default"
              :title="$t('general.close')"
            >
              <span>{{ $t("settings.file_export_import.backup_restore") }}</span>
              {{ ' ' }}
              <FAIcon
                icon="chevron-down"
              />
            </button>
          </template>
          <template #content="{close}">
            <div class="dropdown-menu">
              <button
                class="button-default dropdown-item dropdown-item-icon"
                @click.prevent="backup"
                @click="close"
              >
                <FAIcon
                  icon="file-download"
                  fixed-width
                /><span>{{ $t("settings.file_export_import.backup_settings") }}</span>
              </button>
              <button
                class="button-default dropdown-item dropdown-item-icon"
                @click.prevent="backupWithTheme"
                @click="close"
              >
                <FAIcon
                  icon="file-download"
                  fixed-width
                /><span>{{ $t("settings.file_export_import.backup_settings_theme") }}</span>
              </button>
              <button
                class="button-default dropdown-item dropdown-item-icon"
                @click.prevent="restore"
                @click="close"
              >
                <FAIcon
                  icon="file-upload"
                  fixed-width
                /><span>{{ $t("settings.file_export_import.restore_settings") }}</span>
              </button>
            </div>
          </template>
        </Popover>

        <Checkbox
          :model-value="!!expertLevel"
          @update:modelValue="expertLevel = Number($event)"
        >
          {{ $t("settings.expert_mode") }}
        </Checkbox>
        <span
          id="unscrolled-content"
          class="extra-content"
        />
        <button
          v-if="currentUser"
          class="button-default logout-button"
          :title="$t('login.logout')"
          :aria-label="$t('login.logout')"
          @click.prevent="logout"
        >
          <svg
            style="display:inline-block;vertical-align:middle;margin-right: 8px;"
            fill="var(--text, #d8a070)"
            width="16px"
            height="16px"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.0355 7.5L7.64641 4.11092L8.35352 3.40381L12.9497 8L8.35352 12.5962L7.64641 11.8891L11.0355 8.5L3.75732 8.5L3.75732 7.5H11.0355Z"
            />
          </svg>
          <span>{{ $t('login.logout') }}</span>
        </button>
      </div>
    </div>
  </Modal>
</template>

<script src="./settings_modal.js"></script>

<style src="./settings_modal.scss" lang="scss"></style>
