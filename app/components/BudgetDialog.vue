<template>
	<div
		v-if="isOpen"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
		@click.self="close"
	>
		<div
			class="bg-card rounded-lg shadow-xl max-w-md w-full p-6 border border-border transform transition-all"
			@click.stop
		>
			<div class="mb-6">
				<h2 class="text-2xl font-bold text-foreground mb-1">
					Set your max budget
				</h2>
				<p class="text-muted-foreground">
					Category: {{ categoryName }}
				</p>
			</div>

			<form @submit.prevent="handleSubmit">
				<div class="mb-6">
					<div class="relative">
						<span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
							R
						</span>
						<input
							id="budget"
							ref="budgetInput"
							v-model.number="budgetValue"
							type="number"
							min="0"
							step="1"
							placeholder="0"
							class="w-full pl-8 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
							required
						>
					</div>
					<div class="flex gap-2 mt-3">
						<Button
							v-for="amount in [1000, 5000, 10000]"
							:key="amount"
							type="button"
							variant="outline"
							size="sm"
							class="flex-1"
							@click="addAmount(amount)"
						>
							+{{ formatShortAmount(amount) }}
						</Button>
					</div>
				</div>

				<div class="flex gap-3">
					<Button
						type="button"
						variant="outline"
						class="flex-1"
						@click="close"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						class="flex-1"
						:disabled="!budgetValue || budgetValue <= 0"
					>
						Continue
					</Button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	isOpen: boolean
	categoryName: string
}>()

const emit = defineEmits<{
	close: []
	submit: [budget: number]
}>()

const budgetValue = ref<number | null>(null)
const budgetInput = ref<HTMLInputElement>()

const formatShortAmount = (amount: number) => {
	if (amount >= 1000) {
		return `R${amount / 1000}k`
	}
	return `R${amount}`
}

const addAmount = (amount: number) => {
	budgetValue.value = (budgetValue.value || 0) + amount
}

const handleSubmit = () => {
	if (budgetValue.value && budgetValue.value > 0) {
		emit('submit', budgetValue.value)
		budgetValue.value = null
	}
}

const close = () => {
	emit('close')
	budgetValue.value = null
}

// Focus input when dialog opens
watch(() => props.isOpen, (newValue) => {
	if (newValue) {
		nextTick(() => {
			budgetInput.value?.focus()
		})
	}
})

// Close on Escape key
onMounted(() => {
	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && props.isOpen) {
			close()
		}
	}
	window.addEventListener('keydown', handleEscape)
	onUnmounted(() => {
		window.removeEventListener('keydown', handleEscape)
	})
})
</script>
