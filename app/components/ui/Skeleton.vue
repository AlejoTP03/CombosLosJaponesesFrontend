<!-- components/ui/Skeleton.vue -->
<template>
    <div :class="cn('animate-pulse rounded-md bg-gray-200', className)" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ className?: string }>();
</script>