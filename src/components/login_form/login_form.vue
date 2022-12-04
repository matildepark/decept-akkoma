<template>
  <div class="login panel panel-default">
    <!-- Default panel contents -->

    <div class="panel-heading">
      {{ $t('login.login') }}
    </div>

    <div class="panel-body">
      <form
        class="login-form"
        @submit.prevent="submit"
      >
        <template v-if="isPasswordAuth">
          <div class="form-group">
            <label for="username">{{ $t('login.username') }}</label>
            <input
              id="username"
              v-model="user.username"
              :disabled="loggingIn"
              class="form-control"
              :placeholder="$t('login.placeholder')"
            >
          </div>
          <div class="form-group">
            <label for="password">{{ $t('login.password') }}</label>
            <input
              id="password"
              ref="passwordInput"
              v-model="user.password"
              :disabled="loggingIn"
              class="form-control"
              placeholder="hunter2"
              type="password"
            >
          </div>
          <div class="form-group">
            <router-link :to="{name: 'password-reset'}">
              {{ $t('password_reset.forgot_password') }}
            </router-link>
          </div>
        </template>

        <div
          v-if="isTokenAuth"
          class="form-group"
        >
          <p>{{ $t('login.description') }}</p>
        </div>

        <div class="form-group">
          <div class="login-bottom">
            <div>
              <router-link
                v-if="registrationOpen"
                :to="{name: 'registration'}"
                class="register"
              >
                {{ $t('login.register') }}
              </router-link>
              <a
                class="register"
                href="https://reciprocal.ltd/store"
                target="_blank"
              >
                Register
              </a>
            </div>
            <button
              :disabled="loggingIn"
              type="submit"
              class="btn button-default"
            >
              {{ $t('login.login') }}
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

<script src="./login_form.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.login-form {
  display: flex;
  flex-direction: column;
  padding: 0.6em;

  .btn {
    min-height: 2em;
    width: 10em;
  }

  .register {
    flex: 1 1;
  }

  .login-bottom {
    margin-top: 1.0em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    padding: 0.3em 0.5em 0.6em;
    line-height:24px;
  }

  .form-bottom {
    display: flex;
    padding: 0.5em;
    height: 32px;

    button {
      width: 10em;
    }

    p {
      margin: 0.35em;
      padding: 0.35em;
      display: flex;
    }
  }

  .error {
    text-align: center;

    animation-name: shakeError;
    animation-duration: 0.4s;
    animation-timing-function: ease-in-out;
  }
}
</style>
