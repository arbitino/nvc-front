<script setup lang="ts">
import { useDatabase } from '@/shared/api'
import { storeToRefs } from 'pinia'
import { Select } from '@/shared/ui/fields'
import { computed } from 'vue'
import { findDatabaseByCode, mapDatabasesToSelectOptions } from '@/features/databases'

const { currentDatabase, databases } = storeToRefs(useDatabase())
const { changeDatabase, loadDatabases } = useDatabase()

//TODO lang or msg fix
const label = computed(() => `Работаем с ${currentDatabase.value?.name || 'Не выбрано'}`)
const databasesOptions = computed(() => mapDatabasesToSelectOptions(databases.value))

const onChange = (selectedDatabaseCode: string) => {
    const db = findDatabaseByCode(selectedDatabaseCode)

    if (db) {
        changeDatabase(db)
    }
}

loadDatabases()
</script>

<template>
    <div class="min-w-64">
        <Select
            name="databases"
            :options="databasesOptions"
            :label="label"
            @change="onChange"
            id="databases"
        />
    </div>
</template>

<style scoped></style>
