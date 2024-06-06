<script setup lang="ts">
import { DatabaseSelect } from '../../../features/databases'
import { ThemeSwitcher } from '../../../features/theme-switcher'
</script>

<template>
    <header class="pt-8 pb-2 px-10">
        <div class="container mx-auto flex flex-wrap gap-4 justify-between items-start">
            <DatabaseSelect />

            <ThemeSwitcher />
        </div>
    </header>
</template>

<style scoped></style>
