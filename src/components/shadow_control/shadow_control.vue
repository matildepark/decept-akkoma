<template>
  <div
    class="shadow-control"
    :class="{ disabled: !present }"
  >
    <div class="shadow-preview-container">
      <div
        :disabled="!present"
        class="y-shift-control"
      >
        <input
          v-model="selected.y"
          :disabled="!present"
          class="input-number"
          type="number"
        >
        <div class="wrap">
          <input
            v-model="selected.y"
            :disabled="!present"
            class="input-range"
            type="range"
            max="20"
            min="-20"
          >
        </div>
      </div>
      <div class="preview-window">
        <div
          class="preview-block"
          :style="style"
        />
      </div>
      <div
        :disabled="!present"
        class="x-shift-control"
      >
        <input
          v-model="selected.x"
          :disabled="!present"
          class="input-number"
          type="number"
        >
        <div class="wrap">
          <input
            v-model="selected.x"
            :disabled="!present"
            class="input-range"
            type="range"
            max="20"
            min="-20"
          >
        </div>
      </div>
    </div>

    <div class="shadow-tweak">
      <div
        :disabled="usingFallback"
        class="id-control style-control"
      >
        <Select
          id="shadow-switcher"
          v-model="selectedId"
          class="shadow-switcher"
          :disabled="!ready || usingFallback"
        >
          <option
            v-for="(shadow, index) in cValue"
            :key="index"
            :value="index"
          >
            {{ $t('settings.style.shadows.shadow_id', { value: index }) }}
          </option>
        </Select>
        <button
          class="btn button-default"
          :disabled="!ready || !present"
          @click="del"
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
        <button
          class="btn button-default"
          :disabled="!moveUpValid"
          @click="moveUp"
        >
          <FAIcon
            fixed-width
            icon="chevron-up"
          />
        </button>
        <button
          class="btn button-default"
          :disabled="!moveDnValid"
          @click="moveDn"
        >
          <FAIcon
            fixed-width
            icon="chevron-down"
          />
        </button>
        <button
          class="btn button-default"
          :disabled="usingFallback"
          @click="add"
        >
          <FAIcon
            fixed-width
            icon="plus"
          />
        </button>
      </div>
      <div
        :disabled="!present"
        class="inset-control style-control"
      >
        <label
          for="inset"
          class="label"
        >
          {{ $t('settings.style.shadows.inset') }}
        </label>
        <input
          id="inset"
          v-model="selected.inset"
          :disabled="!present"
          name="inset"
          class="input-inset"
          type="checkbox"
        >
        <label
          class="checkbox-label"
          for="inset"
        />
      </div>
      <div
        :disabled="!present"
        class="blur-control style-control"
      >
        <label
          for="spread"
          class="label"
        >
          {{ $t('settings.style.shadows.blur') }}
        </label>
        <input
          id="blur"
          v-model="selected.blur"
          :disabled="!present"
          name="blur"
          class="input-range"
          type="range"
          max="20"
          min="0"
        >
        <input
          v-model="selected.blur"
          :disabled="!present"
          class="input-number"
          type="number"
          min="0"
        >
      </div>
      <div
        :disabled="!present"
        class="spread-control style-control"
      >
        <label
          for="spread"
          class="label"
        >
          {{ $t('settings.style.shadows.spread') }}
        </label>
        <input
          id="spread"
          v-model="selected.spread"
          :disabled="!present"
          name="spread"
          class="input-range"
          type="range"
          max="20"
          min="-20"
        >
        <input
          v-model="selected.spread"
          :disabled="!present"
          class="input-number"
          type="number"
        >
      </div>
      <ColorInput
        v-model="selected.color"
        :disabled="!present"
        :label="$t('settings.style.common.color')"
        :fallback="currentFallback.color"
        :show-optional-tickbox="false"
        name="shadow"
      />
      <OpacityInput
        v-model="selected.alpha"
        :disabled="!present"
      />
      <i18n-t
        scope="global"
        keypath="settings.style.shadows.hintV3"
        tag="p"
      >
        <code>--variable,mod</code>
      </i18n-t>
    </div>
  </div>
</template>

<script src="./shadow_control.js"></script>

<style lang="scss">
@import '../../_variables.scss';
.shadow-control {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1em;

  .shadow-preview-container,
  .shadow-tweak {
    margin: 5px 6px 0 0;
  }
  .shadow-preview-container {
    flex: 0;
    display: flex;
    flex-wrap: wrap;

    $side: 15em;

    input[type=number] {
      width: 5em;
      min-width: 2em;
    }
    .x-shift-control,
    .y-shift-control {
      display: flex;
      flex: 0;

      &[disabled=disabled] *{
        opacity: .5
      }

    }

    .x-shift-control {
      align-items: flex-start;
    }

    .x-shift-control .wrap,
    input[type=range] {
      margin: 0;
      width: $side;
      height: 2em;
    }
    .y-shift-control {
      flex-direction: column;
      align-items: flex-end;
      .wrap {
        width: 2em;
        height: $side;
      }
      input[type=range] {
        transform-origin: 1em 1em;
        transform: rotate(90deg);
      }
    }
    .preview-window {
      flex: 1;
      background-color: #999999;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image:
      linear-gradient(45deg, #666666 25%, transparent 25%),
      linear-gradient(-45deg, #666666 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #666666 75%),
      linear-gradient(-45deg, transparent 75%, #666666 75%);
      background-size: 20px 20px;
      background-position:0 0, 0 10px, 10px -10px, -10px 0;

      border-radius: $fallback--inputRadius;
      border-radius: var(--inputRadius, $fallback--inputRadius);

      .preview-block {
        width: 33%;
        height: 33%;
        background-color: $fallback--bg;
        background-color: var(--bg, $fallback--bg);
        border-radius: $fallback--panelRadius;
        border-radius: var(--panelRadius, $fallback--panelRadius);
      }
    }
  }

  .shadow-tweak {
    flex: 1;
    min-width: 280px;

    .id-control {
      align-items: stretch;

      .shadow-switcher {
        flex: 1;
      }

      .shadow-switcher, .btn {
        min-width: 1px;
        margin-right: 5px;
      }

      .btn {
        padding: 0 .4em;
        margin: 0 .1em;
      }
    }
  }
}
</style>
