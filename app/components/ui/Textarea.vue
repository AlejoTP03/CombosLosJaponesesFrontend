<!-- components/ui/Textarea.vue -->
<template>
    <textarea
        v-model="modelValue"
        :class="cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
    )" v-bind="$attrs">
        <slot />
    </textarea>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils';

interface Props {
  className?: string;
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

// Para que v-model funcione correctamente
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>