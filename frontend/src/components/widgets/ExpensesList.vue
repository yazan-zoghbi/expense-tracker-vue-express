<template>
  <v-card class="mx-auto mb-5" max-width="600">
    <v-toolbar :color="colors.primary">
      <v-btn icon="mdi-menu"></v-btn>

      <v-toolbar-title>Latest Expneses</v-toolbar-title>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-checkbox-marked-circle"></v-btn>
    </v-toolbar>

    <v-list
      v-model:selected="selected"
      select-strategy="leaf"
      :color="colors.primaryDark"
      :base-color="colors.primary"
    >
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :value="item.id"
        active-class="selected-item"
        class="text-left py-3"
      >
        <div class="d-flex align-center ga-3">
          <div>
            <div class="pa-4 category-icon rounded-circle">
              <v-icon class="" icon="mdi-food"></v-icon>
            </div>
          </div>

          <div>
            <v-chip class="mb-3" rounded="lg">Label</v-chip>
            <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">{{
              item.headline
            }}</v-list-item-subtitle>

            <v-list-item-subtitle class="text-high-emphasis">{{
              item.subtitle
            }}</v-list-item-subtitle>
          </div>
        </div>

        <template v-slot:append="{ isSelected }">
          <v-list-item-action class="flex-column align-end">
            <small class="mb-4 text-high-emphasis opacity-60">{{
              item.action
            }}</small>

            <v-spacer></v-spacer>

            <small class="mt-4 mb-4 text-high-emphasis opacity-60 text-error"
              >USD -{{ item.value.toLocaleString() }}
            </small>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { useColors } from "../../composables/useColors";

const { colors } = useColors();
import { shallowRef } from "vue";

const items = [
  {
    id: 1,
    action: "15 min",
    value: 5000,
    headline: "Brunch this weekend?",
    subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
    title: "Ali Connors",
  },
  {
    id: 2,
    action: "2 hr",
    value: 5000,
    headline: "Summer BBQ",
    subtitle: `Wish I could come, but I'm out of town this weekend.`,
    title: "me, Scrott, Jennifer",
  },
  {
    id: 3,
    action: "6 hr",
    value: 5000,

    headline: "Oui oui",
    subtitle: "Do you have Paris recommendations? Have you ever been?",
    title: "Sandra Adams",
  },
  {
    id: 4,
    action: "12 hr",
    value: 5000,
    headline: "Birthday gift",
    subtitle: "Have any ideas about what we should get Heidi for her birthday?",
    title: "Trevor Hansen",
  },
  {
    id: 5,
    action: "18hr",
    value: 5000,
    headline: "Recipe to try",
    subtitle: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
    title: "Britta Holt",
  },
];

const selected = shallowRef([2]);
</script>

<style scoped>
.widget {
  border: 1px solid;
  border-color: var(--color-border);
}

.selected-item {
  color: var(--color-text);
}

.expense-value {
  color: var(--color-border);
}

.category-icon {
  background-color: var(--color-background);
}
</style>
