<script setup lang="ts">
import { FORM_PAGE_HEADER_MSG, FULL_FORM_MSG, SHORT_FORM_MSG } from '../lang/ru'
import { SingleVacancyForm } from '@/features/vacancy'
import { useDatabase } from '@/shared/api'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { FamousDatabases } from '@/shared/types'

const { currentDatabase } = storeToRefs(useDatabase())

const fullUrl = computed(() => {
    return currentDatabase.value?.code === FamousDatabases.HOSTING
        ? import.meta.env.VITE_API_HOSTING_FORM_URL
        : import.meta.env.VITE_API_TITAN_FORM_URL
})
</script>

<template>
    <div>
        <h2
            class="mb-3 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white"
        >
            {{ FORM_PAGE_HEADER_MSG }} <span class="text-xl">({{ SHORT_FORM_MSG }})</span>
        </h2>

        <a
            class="mb-10 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            :href="fullUrl"
            target="_blank"
        >
            {{ FULL_FORM_MSG }}
        </a>

        <SingleVacancyForm />
    </div>
</template>

<style scoped></style>
