<script setup lang="ts">
import { ExportForm } from '@/features/resume-files'
import { HEADER } from '../lang/ru'
</script>

<template>
    <div>
        <h2
            class="mb-10 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white"
        >
            {{ HEADER }}
        </h2>

        <div>
            <ExportForm />
        </div>
    </div>
</template>

<style scoped></style>
