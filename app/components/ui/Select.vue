<!-- components/ui/Select.vue -->
<template>
    <select :class="cn(
        'border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full items-center justify-between rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
    )" v-bind="$attrs">
        <slot />
    </select>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils';
defineProps<{ className?: string }>();
</script>