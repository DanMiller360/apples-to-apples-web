<template>
	<header class="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
		<div class="container mx-auto px-6 h-16 flex items-center justify-between">
			<div class="flex items-center gap-3">
				<img
					src="/logo.png"
					alt="Logo"
					class="w-20 h-20 text-foreground"
				>
				<div class="text-xl font-semibold text-foreground">
					Apples to Apples
				</div>
			</div>

			<button
				class="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
				:class="isDark ? 'bg-primary' : 'bg-muted'"
				aria-label="Toggle dark mode"
				@click="toggleDarkMode"
			>
				<span
					class="inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-background transition-transform duration-200 ease-in-out"
					:class="isDark ? 'translate-x-7' : 'translate-x-1'"
				>
					<Moon
						v-if="isDark"
						:size="14"
						class="text-foreground"
					/>
					<Sun
						v-else
						:size="14"
						class="text-foreground"
					/>
				</span>
			</button>
		</div>
	</header>
</template>

<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const isDark = ref(false)

// Check for saved preference or default to light mode
onMounted(() => {
	const savedTheme = localStorage.getItem('theme')
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

	isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
	applyTheme()
})

const toggleDarkMode = () => {
	isDark.value = !isDark.value
	applyTheme()
}

const applyTheme = () => {
	if (isDark.value) {
		document.documentElement.classList.add('dark')
		localStorage.setItem('theme', 'dark')
	}
	else {
		document.documentElement.classList.remove('dark')
		localStorage.setItem('theme', 'light')
	}
}
</script>
