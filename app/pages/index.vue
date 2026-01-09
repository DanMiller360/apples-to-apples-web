<template>
	<div class="min-h-screen bg-gradient-to-br from-primary/60 via-accent/70 to-background/100">
		<div class="container mx-auto px-6 pt-24 pb-12">
			<div class="max-w-4xl mx-auto">
				<div class="text-center mb-12">
					<h1 class="text-4xl font-bold text-foreground mb-4">
						Choose a Category
					</h1>
					<p class="text-muted-foreground text-lg">
						Select a category to start comparing products
					</p>
				</div>

				<!-- Loading State -->
				<div
					v-if="loading"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<div
						v-for="i in 6"
						:key="i"
						class="h-32 bg-card/50 backdrop-blur-sm rounded-lg animate-pulse"
					/>
				</div>

				<!-- Error State -->
				<ErrorState
					v-else-if="error"
					title="Failed to load categories"
					:message="error"
					@retry="fetchCategories"
				/>

				<!-- Categories Grid -->
				<div
					v-else
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<button
						v-for="category in categories"
						:key="category.id"
						class="group relative overflow-hidden bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-200 rounded-lg p-6 border-2 border-border hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md hover:shadow-xl"
						@click="selectCategory(category)"
					>
						<div class="flex flex-col items-center justify-center h-full min-h-[120px]">
							<h3 class="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
								{{ category.name }}
							</h3>
						</div>
						<div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { CategoryResponse } from '~/types/category'

const api = useApi()
const categories = ref<CategoryResponse[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchCategories = async () => {
	loading.value = true
	error.value = null
	try {
		categories.value = await api.categories.getAll()
	}
	catch (err) {
		error.value = err instanceof Error ? err.message : 'An unknown error occurred'
	}
	finally {
		loading.value = false
	}
}

const selectCategory = (category: CategoryResponse) => {
	console.log('Selected category:', category)
	// TODO: Navigate to search page or open search modal
}

// Fetch categories on mount
onMounted(() => {
	fetchCategories()
})
</script>
