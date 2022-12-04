<template>
  <div
    v-if="visible"
    class="poll-form"
  >
    <div
      v-for="(option, index) in options"
      :key="index"
      class="poll-option"
    >
      <div class="input-container">
        <input
          :id="`poll-${index}`"
          v-model="options[index]"
          size="1"
          class="poll-option-input"
          type="text"
          :placeholder="$t('polls.option')"
          :maxlength="maxLength"
          @change="updatePollToParent"
          @keydown.enter.stop.prevent="nextOption(index)"
        >
      </div>
      <button
        v-if="options.length > 2"
        class="delete-option button-unstyled -hover-highlight"
        @click="deleteOption(index)"
      >
        <svg
          style="display:inline-block;vertical-align:middle;"
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
    <button
      v-if="options.length < maxOptions"
      class="add-option faint button-unstyled -hover-highlight"
      @click="addOption"
    >
      <svg
        style="display:inline-block;vertical-align:middle;"
        width="16px"
        height="16px"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 8.5V13.5H8.5V8.5H13.5V7.5H8.5V2.5H7.5V7.5H2.5V8.5H7.5Z"
        />

      </svg>

      {{ $t("polls.add_option") }}
    </button>
    <div class="poll-type-expiry">
      <div
        class="poll-type"
        :title="$t('polls.type')"
      >
        <Select
          v-model="pollType"
          class="poll-type-select"
          unstyled="true"
          @change="updatePollToParent"
        >
          <option value="single">
            {{ $t('polls.single_choice') }}
          </option>
          <option value="multiple">
            {{ $t('polls.multiple_choices') }}
          </option>
        </Select>
      </div>
      <div
        class="poll-expiry"
        :title="$t('polls.expiry')"
      >
        <input
          v-model="expiryAmount"
          type="number"
          class="expiry-amount hide-number-spinner"
          :min="minExpirationInCurrentUnit"
          :max="maxExpirationInCurrentUnit"
          @change="expiryAmountChange"
        >
        {{ ' ' }}
        <Select
          v-model="expiryUnit"
          unstyled="true"
          class="expiry-unit"
          @change="expiryAmountChange"
        >
          <option
            v-for="unit in expiryUnits"
            :key="unit"
            :value="unit"
          >
            {{ $tc(`time.unit.${unit}_short`, expiryAmount, ['']) }}
          </option>
        </Select>
      </div>
    </div>
  </div>
</template>

<script src="./poll_form.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.poll-form {
  display: flex;
  flex-direction: column;
  padding: 0 0.5em 0.5em;

  .add-option {
    align-self: flex-start;
    padding-top: 0.25em;
    padding-left: 0.1em;
  }

  .poll-option {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 0.25em;
  }

  .input-container {
    width: 100%;
    input {
      // Hack: dodge the floating X icon
      padding-right: 2.5em;
      width: 100%;
    }
  }

  .delete-option {
    // Hack: Move the icon over the input box
    width: 1.5em;
    margin-left: -1.5em;
    z-index: 1;
  }

  .poll-type-expiry {
    margin-top: 0.5em;
    display: flex;
    width: 100%;
  }

  .poll-type {
    margin-right: 0.75em;
    flex: 1 1 60%;

    .poll-type-select {
      padding-right: 0.75em;
    }
  }

  .poll-expiry {
    display: flex;

    .expiry-amount {
      width: 3em;
      text-align: right;
    }
  }
}
</style>
