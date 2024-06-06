<script setup lang="ts">
import { HOME_PAGE_HEADER_MSG } from '../lang/ru'
import { UploadVacancyFile } from '@/features/vacancy'
</script>

<template>
    <div>
        <h2
            class="mb-10 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white"
        >
            {{ HOME_PAGE_HEADER_MSG }}
        </h2>

        <div>
            <UploadVacancyFile />
        </div>
    </div>
</template>

<style scoped></style>
