<template>
	<div class="flex items-center gap-2">
		<span class="text-xs text-muted-foreground w-20 flex-shrink-0">
			{{ label }}
		</span>
		<div class="flex-grow h-2 bg-muted rounded-full overflow-hidden">
			<div
				class="h-full transition-all duration-500 rounded-full"
				:class="getBarColor(score)"
				:style="{ width: `${(score / 10) * 100}%` }"
			/>
		</div>
		<span class="text-xs font-semibold text-foreground w-8 text-right">
			{{ score.toFixed(1) }}
		</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	label: string
	score: number
}>()

const getBarColor = (score: number) => {
	if (score >= 8) return 'bg-green-500'
	if (score >= 6) return 'bg-yellow-500'
	return 'bg-orange-500'
}
</script>
