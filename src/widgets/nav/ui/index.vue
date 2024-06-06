<script setup lang="ts">
import { appRoutes } from '../../../shared/routes'
</script>

<template>
    <nav class="pt-2 pb-8 shadow-lg px-10">
        <ul
            class="container mx-auto flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
        >
            <li v-for="route in appRoutes" :key="route.name" class="me-2">
                <RouterLink :to="route.path" class="router-link">
                    {{ route.title }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
.router-link {
    @apply inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-300;

    &.router-link-active {
        @apply inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-white;
    }
}
</style>
