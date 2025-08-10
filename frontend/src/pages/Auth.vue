<template>
  <v-container>
    <AuthForm @login="handleLogin" @signup="handleSignup"></AuthForm>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import AuthForm from "../components/AuthForm.vue";
import { useAuth } from "../composables/useAuth";

const { login, signup } = useAuth();
const router = useRouter();

const handleLogin = async (loginData) => {
  const response = await login(loginData);
  if (response.success) router.push("/dashboard");
};

const handleSignup = async (signupData) => {
  const response = await signup(signupData);
  if (response.success) router.push("/auth");
};
</script>
