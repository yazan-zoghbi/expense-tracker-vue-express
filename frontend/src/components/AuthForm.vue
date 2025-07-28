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
        <v-tabs-window-item :value="1">
          <v-form class="mt-5">
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Username</v-label>
              <v-text-field
                type="text"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                icon-color="grey"
                placeholder="Enter your username"
                rounded="lg"
                bg-color="#f7f8f9"
                base-color="#f7f8f9"
              >
              </v-text-field>
            </div>
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Password</v-label>
              <v-text-field
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
              >
              </v-text-field>
            </div>
            <div class="d-flex justify-space-between align-center">
              <v-checkbox label="Remember me" hide-details></v-checkbox>
              <a href=""> Forgot password?</a>
            </div>
            <v-btn
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
          <v-form class="mt-5">
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Full name</v-label>
              <v-text-field
                type="text"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                icon-color="grey"
                placeholder="Enter your full name"
                rounded="lg"
                bg-color="#f7f8f9"
                base-color="#f7f8f9"
              >
              </v-text-field>
            </div>
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Email</v-label>
              <v-text-field
                type="text"
                variant="outlined"
                prepend-inner-icon="mdi-email-outline"
                icon-color="grey"
                placeholder="Enter your email"
                rounded="lg"
                bg-color="#f7f8f9"
                base-color="#f7f8f9"
              >
              </v-text-field>
            </div>
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Username</v-label>
              <v-text-field
                type="text"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                icon-color="grey"
                placeholder="Choose a username"
                rounded="lg"
                bg-color="#f7f8f9"
                base-color="#f7f8f9"
              >
              </v-text-field>
            </div>
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Password</v-label>
              <v-text-field
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
              >
              </v-text-field>
            </div>
            <div class="d-flex flex-column align-left ga-2">
              <v-label class="text-body-2">Password</v-label>
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
              >
              </v-text-field>
            </div>

            <div class="d-flex align-center">
              <v-checkbox hide-details> </v-checkbox>
              <p>
                I agree to the<a href=""> Terms of Service</a> and
                <a href="">Privacy Policy</a>
              </p>
            </div>
            <v-btn
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
import { ref } from "vue";

const visible = ref(false);
const tab = ref(null);
</script>
