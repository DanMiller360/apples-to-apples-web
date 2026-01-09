<template>
	<div class="text-center py-12">
		<div class="bg-destructive/10 text-destructive rounded-lg p-6 max-w-md mx-auto">
			<p class="font-semibold mb-2">
				{{ title }}
			</p>
			<p
				v-if="message"
				class="text-sm"
			>
				{{ message }}
			</p>
			<Button
				v-if="retryable"
				class="mt-4"
				@click="emit('retry')"
			>
				{{ retryText }}
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	title?: string
	message?: string
	retryable?: boolean
	retryText?: string
}

interface Emits {
	(e: 'retry'): void
}

withDefaults(defineProps<Props>(), {
	title: 'Something went wrong',
	message: '',
	retryable: true,
	retryText: 'Try Again',
})

const emit = defineEmits<Emits>()
</script>
