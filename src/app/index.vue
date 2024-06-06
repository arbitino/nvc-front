<script setup lang="ts">
import { Header } from '@/widgets/header'
import { Nav } from '@/widgets/nav'
</script>

<template>
    <div class="h-screen flex-col">
        <Header />
        <Nav />

        <main class="container mx-auto py-6 px-10">
            <RouterView />
        </main>
    </div>
</template>
