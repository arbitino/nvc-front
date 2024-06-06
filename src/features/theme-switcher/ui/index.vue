<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import { DARK_THEME_MSG, LIGHT_THEME_MSG } from '../../../shared/lang/ru/general'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const label = computed(() => (isDark ? DARK_THEME_MSG : LIGHT_THEME_MSG))
</script>

<template>
    <button
        @click="toggleDark()"
        id="theme-toggle"
        type="button"
        class="text-gray-500 ring-2 ring-gray-300 dark:ring-gray-500 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    >
        {{ label }}
    </button>
</template>

<style scoped></style>
