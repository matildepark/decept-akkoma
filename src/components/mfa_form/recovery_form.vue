<template>
  <div class="login panel panel-default">
    <!-- Default panel contents -->

    <div class="panel-heading">
      {{ $t('login.heading.recovery') }}
    </div>

    <div class="panel-body">
      <form
        class="login-form"
        @submit.prevent="submit"
      >
        <div class="form-group">
          <label for="code">{{ $t('login.recovery_code') }}</label>
          <input
            id="code"
            v-model="code"
            class="form-control"
          >
        </div>

        <div class="form-group">
          <div class="login-bottom">
            <div>
              <button
                class="button-unstyled -link"
                type="button"
                @click.prevent="requireTOTP"
              >
                {{ $t('login.enter_two_factor_code') }}
              </button>
              <br>
              <button
                class="button-unstyled -link"
                type="button"
                @click.prevent="abortMFA"
              >
                {{ $t('general.cancel') }}
              </button>
            </div>
            <button
              type="submit"
              class="btn button-default"
            >
              {{ $t('general.verify') }}
            </button>
          </div>
        </div>
      </form>
    </div>

    <div
      v-if="error"
      class="form-group"
    >
      <div class="alert error">
        {{ error }}
        <button
          class="button-unstyled"
          @click="clearError"
        >
          <svg
            stroke="var(--Text,#000000"
            width="16px"
            height="16px"
            @click="clearError"
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
  </div>
</template>
<script src="./recovery_form.js"></script>
