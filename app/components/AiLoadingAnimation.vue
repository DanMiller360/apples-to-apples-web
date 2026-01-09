<template>
	<div class="flex flex-col items-center justify-center py-16 px-6">
		<!-- Animated Icon -->
		<div class="relative mb-8">
			<!-- Pulsing circles -->
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="w-32 h-32 rounded-full bg-primary/20 animate-ping" />
			</div>
			<div class="absolute inset-0 flex items-center justify-center animation-delay-150">
				<div class="w-24 h-24 rounded-full bg-primary/30 animate-ping" />
			</div>

			<!-- Center Icon -->
			<div class="relative z-10 w-32 h-32 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-full border-2 border-primary shadow-xl">
				<Icon
					:name="currentStage?.icon || 'material-symbols-light:search'"
					size="64"
					class="text-primary animate-pulse"
				/>
			</div>
		</div>

		<!-- Status Text -->
		<div class="text-center mb-8">
			<h2 class="text-2xl font-bold text-foreground mb-2 transition-all duration-300">
				{{ currentStage?.title || 'Searching Products' }}
			</h2>
			<p class="text-muted-foreground text-lg">
				{{ currentStage?.description || 'AI is scanning retailers for matching products...' }}
			</p>
		</div>

		<!-- Progress Stages -->
		<div class="flex items-center gap-3 mb-8">
			<div
				v-for="(stage, index) in stages"
				:key="index"
				class="flex items-center gap-3"
			>
				<div
					class="w-3 h-3 rounded-full transition-all duration-300"
					:class="index <= currentStageIndex ? 'bg-primary scale-110' : 'bg-muted'"
				/>
				<div
					v-if="index < stages.length - 1"
					class="w-8 h-0.5 transition-all duration-300"
					:class="index < currentStageIndex ? 'bg-primary' : 'bg-muted'"
				/>
			</div>
		</div>

		<!-- Loading Bar -->
		<div class="w-full max-w-md">
			<div class="h-2 bg-muted rounded-full overflow-hidden">
				<div
					class="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer transition-all duration-500"
					:style="{ width: `${progress}%` }"
				/>
			</div>
			<p class="text-center text-sm text-muted-foreground mt-2">
				This may take a moment...
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Stage {
	icon: string
	title: string
	description: string
}

const stages: Stage[] = [
	{
		icon: 'material-symbols-light:search',
		title: 'Searching Products',
		description: 'AI is scanning retailers for matching products...',
	},
	{
		icon: 'material-symbols-light:psychology-alt-outline',
		title: 'Analyzing Features',
		description: 'Evaluating specifications and capabilities...',
	},
	{
		icon: 'material-symbols-light:calculate-outline',
		title: 'Scoring Options',
		description: 'Calculating price, feature, and reliability scores...',
	},
	{
		icon: 'material-symbols-light:compare-arrows',
		title: 'Comparing Results',
		description: 'Ranking products based on your budget...',
	},
]

const currentStageIndex = ref(0)
const progress = ref(0)

const currentStage = computed(() => stages[currentStageIndex.value] || stages[0])

// Cycle through stages (client-side only)
onMounted(() => {
	const stageInterval = setInterval(() => {
		if (currentStageIndex.value < stages.length - 1) {
			currentStageIndex.value++
		}
		else {
			currentStageIndex.value = 0
		}
	}, 3000) // Change stage every 3 seconds

	// Smooth progress animation
	const progressInterval = setInterval(() => {
		if (progress.value < 95) {
			// Gradually slow down as we approach the end
			const increment = (100 - progress.value) * 0.02
			progress.value = Math.min(progress.value + increment, 95)
		}
	}, 300)

	// Cleanup intervals on unmount
	onUnmounted(() => {
		clearInterval(stageInterval)
		clearInterval(progressInterval)
	})
})
</script>

<style scoped>
@keyframes shimmer {
	0% {
		background-position: -200% center;
	}
	100% {
		background-position: 200% center;
	}
}

.animate-shimmer {
	animation: shimmer 2s infinite linear;
}

.animation-delay-150 {
	animation-delay: 150ms;
}
</style>
