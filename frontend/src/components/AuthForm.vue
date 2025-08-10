<template>
  <v-container>
    <v-card class="pa-8" color="white" width="500" rounded="xl" elevation="24">
      <v-card-title>Expense Tracker</v-card-title>
      <h3 class="text-caption">Manage your finances with ease</h3>
      <v-tabs
        v-model="tab"
        class="pa-1 mt-5 rounded-lg"
        align-tabs="center"
        bg-color="#f7f8f9"
        grow
        density="default"
        height="50"
        hide-slider
      >
        <v-tab
          :value="1"
          size="small"
          color="white"
          variant="flat"
          rounded="lg"
          border="none"
          stacked
          base-color="#f7f8f9"
          elevation="1"
          >Sign in</v-tab
        >
        <v-tab
          :value="2"
          size="small"
          color="white"
          variant="flat"
          rounded="lg"
          border="none"
          stacked
          base-color="#f7f8f9"
          elevation="1"
          >Sign up</v-tab
        >
      </v-tabs>
      <v-tabs-window v-model="tab">
        <!-- Login Form -->
        <v-tabs-window-item :value="1">
          <v-form
            ref="loginForm"
            validate-on="submit"
            @submit.prevent="onLoginSubmit"
            class="mt-5"
          >
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Username</v-label>
              <v-text-field
                v-model="loginFormData.username"
                type="text"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                icon-color="grey"
                placeholder="Enter your username"
                rounded="lg"
                bg-color="#f7f8f9"
                base-color="#f7f8f9"
                :rules="usernameRules"
                required
              >
              </v-text-field>
            </div>
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Password</v-label>
              <v-text-field
                v-model="loginFormData.password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                variant="outlined"
                prepend-inner-icon="mdi-lock-outline"
                icon-color="grey"
                placeholder="Enter your password"
                rounded="lg"
                bg-color="#f7f8f9"
                base-color="#f7f8f9"
                @click:append-inner="visible = !visible"
                :rules="passwordRules"
                required
              >
              </v-text-field>
            </div>
            <div class="d-flex justify-space-between align-center">
              <v-checkbox label="Remember me" hide-details></v-checkbox>
              <a href=""> Forgot password?</a>
            </div>
            <v-btn
              type="submit"
              class="text-capitalize"
              block
              height="40"
              rounded="lg"
              style="
                background-image: linear-gradient(
                  to right,
                  oklch(0.546 0.245 262.881) 0%,
                  oklch(0.511 0.262 276.966) 100%
                );
                color: white;
              "
              >Sign in</v-btn
            >
            <p class="mt-5 text-caption">
              Don't have an account?
              <span style="color: blue">Sign up above</span>
            </p>
          </v-form>
        </v-tabs-window-item>
        <v-tabs-window-item :value="2">
          <!-- Signup Form -->
          <v-form
            ref="signupForm"
            validate-on="submit"
            @submit.prevent="onSignupSubmit"
            class="mt-5"
          >
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Full name</v-label>
              <v-text-field
                v-model="signupFormData.full_name"
                type="text"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                icon-color="grey"
                placeholder="Enter your full name"
                rounded="lg"
                bg-color="#f7f8f9"
                base-color="#f7f8f9"
                :rules="fullnameRules"
              >
              </v-text-field>
            </div>
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Email</v-label>
              <v-text-field
                v-model="signupFormData.email"
                type="email"
                variant="outlined"
                prepend-inner-icon="mdi-email-outline"
                icon-color="grey"
                placeholder="Enter your email"
                rounded="lg"
                bg-color="#f7f8f9"
                base-color="#f7f8f9"
                :rules="emailRules"
              >
              </v-text-field>
            </div>
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Username</v-label>
              <v-text-field
                v-model="signupFormData.username"
                type="text"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                icon-color="grey"
                placeholder="Choose a username"
                rounded="lg"
                bg-color="#f7f8f9"
                base-color="#f7f8f9"
                :rules="usernameRules"
              >
              </v-text-field>
            </div>
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Password</v-label>
              <v-text-field
                v-model="signupFormData.password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                variant="outlined"
                prepend-inner-icon="mdi-lock-outline"
                icon-color="grey"
                placeholder="Create a password"
                rounded="lg"
                bg-color="#f7f8f9"
                base-color="#f7f8f9"
                @click:append-inner="visible = !visible"
                :rules="passwordRules"
              >
              </v-text-field>
            </div>
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Confirm Password</v-label>
              <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                variant="outlined"
                prepend-inner-icon="mdi-lock-outline"
                icon-color="grey"
                placeholder="Confirm your password"
                rounded="lg"
                bg-color="#f7f8f9"
                base-color="#f7f8f9"
                @click:append-inner="visible = !visible"
                :rules="confirmPasswordRules"
              >
              </v-text-field>
            </div>

            <div class="d-flex align-center">
              <v-checkbox
                v-model="signupFormData.agree"
                :rules="agreeRules"
                hide-details
                label="I agree to the Terms of Service and Privacy Policy"
              />
            </div>
            <v-btn
              type="submit"
              class="text-capitalize"
              block
              height="40"
              rounded="lg"
              style="
                background-image: linear-gradient(
                  to right,
                  oklch(0.546 0.245 262.881) 0%,
                  oklch(0.511 0.262 276.966) 100%
                );
                color: white;
              "
              >Create Account</v-btn
            >
            <p class="mt-5 text-caption">
              Don't have an account?
              <span style="color: blue">Sign up above</span>
            </p>
          </v-form>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-container>
</template>

<script setup>
import { reactive, ref, defineEmits } from "vue";

import { toast } from "vue-sonner";

const visible = ref(false);
const tab = ref(null);

const loginForm = ref();
const signupForm = ref();

const loginFormData = reactive({
  username: "",
  password: "",
});

const signupFormData = reactive({
  full_name: "",
  username: "",
  password: "",
  email: "",
  agree: false,
});

const emit = defineEmits(["login", "signup"]);

const usernameRules = [
  (value) => !!value || "Please enter your username.",
  (value) => value.length >= 5 || "Username should be at least 5 characters.",
  (value) =>
    /^[a-zA-Z0-9_]+$/.test(value) ||
    "Only letters, numbers, and underscores are allowed.",
];

const passwordRules = [
  (value) => !!value || "Please enter your password.",
  (value) => value.length >= 8 || "Password must be at least 8 characters.",
  (value) => /[A-Z]/.test(value) || "Include at least one uppercase letter.",
  (value) => /[0-9]/.test(value) || "Include at least one number.",
];

const fullnameRules = [
  (value) => !!value || "Full name is required.",
  (value) =>
    value.trim().length >= 3 || "Full name must be at least 3 characters.",
  (value) =>
    /^[a-zA-Z\s'-]+$/.test(value) ||
    "Only letters, spaces, apostrophes, and hyphens are allowed.",
  (value) =>
    value.trim().split(/\s+/).length >= 2 ||
    "Please enter both first and last name.",
];

const emailRules = [
  (value) => !!value || "Email is required.",
  (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    "Please enter a valid email address.",
];

const confirmPasswordRules = [
  (value) => !!value || "Please confirm your password.",
  (value) => value === signupFormData.password || "Passwords do not match.",
];

const agreeRules = [(value) => value || "You must agree before continuing."];

const onLoginSubmit = async () => {
  const { valid } = await loginForm.value.validate();

  if (!valid) {
    toast.error("Please fix the errors before submitting.");
    return;
  }

  emit("login", loginFormData);
};

const onSignupSubmit = async () => {
  const { valid } = await signupForm.value.validate();
  if (!valid) {
    toast.error("Please fix the errors before submitting.");
    return;
  }
  emit("signup", signupFormData);
};
</script>
