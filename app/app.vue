<script setup>
useHead({
	script: [
		{
			innerHTML: `
				(function() {
					const savedTheme = localStorage.getItem('theme');
					const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
					if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
						document.documentElement.classList.add('dark');
					}
				})();
			`,
			tagPosition: 'head',
		},
	],
})
</script>

<template>
	<HeaderBar />
	<NuxtPage />
</template>
