<template>
  <div class="settings panel panel-default">
    <div class="panel-heading">
      {{ $t('password_reset.password_reset') }}
    </div>
    <div class="panel-body">
      <form
        class="password-reset-form"
        @submit.prevent="submit"
      >
        <div class="container">
          <div v-if="!mailerEnabled">
            <p v-if="passwordResetRequested">
              {{ $t('password_reset.password_reset_required_but_mailer_is_disabled') }}
            </p>
            <p v-else>
              {{ $t('password_reset.password_reset_disabled') }}
            </p>
          </div>
          <div v-else-if="success || throttled">
            <p v-if="success">
              {{ $t('password_reset.check_email') }}
            </p>
            <div class="form-group text-center">
              <router-link :to="{name: 'root'}">
                {{ $t('password_reset.return_home') }}
              </router-link>
            </div>
          </div>
          <div v-else>
            <p
              v-if="passwordResetRequested"
              class="password-reset-required error"
            >
              {{ $t('password_reset.password_reset_required') }}
            </p>
            <p>
              {{ $t('password_reset.instruction') }}
            </p>
            <div class="form-group">
              <input
                ref="email"
                v-model="user.email"
                :disabled="isPending"
                :placeholder="$t('password_reset.placeholder')"
                class="form-control"
                type="input"
              >
            </div>
            <div class="form-group">
              <button
                :disabled="isPending"
                type="submit"
                class="btn button-default btn-block"
              >
                {{ $t('settings.save') }}
              </button>
            </div>
          </div>
          <p
            v-if="error"
            class="alert error notice-dismissible"
          >
            <span>{{ error }}</span>
            <a
              class="fa-scale-110 fa-old-padding dismiss"
              @click.prevent="dismissError()"
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
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./password_reset.js"></script>
<style lang="scss">
@import '../../_variables.scss';

.password-reset-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.6em;

  .container {
    display: flex;
    flex: 1 0;
    flex-direction: column;
    margin-top: 0.6em;
    max-width: 18rem;

    > * {
      min-width: 0;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
    padding: 0.3em 0;
    line-height: 1.85em;
  }

  .error {
    text-align: center;
    animation-name: shakeError;
    animation-duration: 0.4s;
    animation-timing-function: ease-in-out;
  }

  .alert {
    padding: 0.5em;
    margin: 0.3em 0 1em;
  }

  .password-reset-required {
    background-color: var(--alertError, $fallback--alertError);
    padding: 10px 0;
  }

  .notice-dismissible {
    padding-right: 2rem;
  }

  .dismiss {
    cursor: pointer;
  }
}

</style>
