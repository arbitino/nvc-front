<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { Select } from '@/shared/ui/fields'
import {
    type Activity,
    findActivityByName,
    mapActivitiesToSelectOptions,
    useActivitiesModel
} from '@/entities/activities'

const { activities } = storeToRefs(useActivitiesModel())
const { loadActivities } = useActivitiesModel()

const emits = defineEmits<{
    (e: 'change', value: Activity | null): void
}>()

const options = computed(() => mapActivitiesToSelectOptions(activities.value))

const onChange = (activityName: string) => {
    emits('change', findActivityByName(activityName))
}

loadActivities()
</script>

<template>
    <Select
        :options="options"
        @change="onChange"
        label="Вид деятельности"
        name="workActivities"
        id="workActivities"
    />
</template>

<style scoped></style>
