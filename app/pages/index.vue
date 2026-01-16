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
					class="space-y-6"
				>
					<div
						v-for="group in groupedCategories"
						:key="group.name"
						class="space-y-4"
					>
						<!-- Group Header (Collapsible) -->
						<button
							class="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
							@click="toggleGroup(group.name)"
						>
							<h2 class="text-2xl font-semibold text-foreground/90 border-b border-foreground/90 pb-2">
								{{ group.name }}
							</h2>
							<Icon
								name="material-symbols-light:expand-more-rounded"
								size="28"
								class="text-foreground/70 transition-transform duration-200"
								:class="expandedGroups.has(group.name) ? 'rotate-180' : ''"
							/>
						</button>

						<!-- Categories Grid (Collapsible Content) -->
						<div v-show="expandedGroups.has(group.name)">
							<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								<button
									v-for="category in group.categories"
									:key="category.id"
									class="group relative overflow-hidden bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-200 rounded-lg p-6 border-2 border-border hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md hover:shadow-xl"
									@click="selectCategory(category)"
								>
									<div class="flex flex-col items-center justify-center h-full min-h-[120px] gap-3">
										<Icon
											v-if="category.icon"
											:name="category.icon"
											size="48"
											class="text-primary group-hover:scale-110 transition-transform"
										/>
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
			</div>

			<!-- Budget Dialog -->
			<BudgetDialog
				:is-open="showBudgetDialog"
				:category-name="selectedCategory?.name || ''"
				@close="closeBudgetDialog"
				@submit="handleBudgetSubmit"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { CategoryResponse } from '~/types/category'

const api = useApi()
const categories = ref<CategoryResponse[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const showBudgetDialog = ref(false)
const selectedCategory = ref<CategoryResponse | null>(null)
const expandedGroups = ref<Set<string>>(new Set())

const groupedCategories = computed(() => {
	const groups = new Map<string, CategoryResponse[]>()

	for (const category of categories.value) {
		const groupName = category.group
		if (!groups.has(groupName)) {
			groups.set(groupName, [])
		}
		groups.get(groupName)!.push(category)
	}

	return Array.from(groups.entries()).map(([name, categories]) => ({
		name,
		categories,
	}))
})

const toggleGroup = (groupName: string) => {
	if (expandedGroups.value.has(groupName)) {
		expandedGroups.value.delete(groupName)
	}
	else {
		expandedGroups.value.add(groupName)
	}
}

const fetchCategories = async () => {
	loading.value = true
	error.value = null
	try {
		categories.value = await api.categories.getAll()
		// Expand the first group by default
		if (groupedCategories.value.length > 0 && groupedCategories.value[0]) {
			expandedGroups.value.add(groupedCategories.value[0].name)
		}
	}
	catch (err) {
		error.value = err instanceof Error ? err.message : 'An unknown error occurred'
	}
	finally {
		loading.value = false
	}
}

const selectCategory = (category: CategoryResponse) => {
	selectedCategory.value = category
	showBudgetDialog.value = true
}

const closeBudgetDialog = () => {
	showBudgetDialog.value = false
	selectedCategory.value = null
}

const handleBudgetSubmit = (budget: number) => {
	if (selectedCategory.value) {
		navigateTo({
			path: '/compare',
			query: {
				categoryId: selectedCategory.value.id,
				categoryName: selectedCategory.value.name,
				budget: budget.toString(),
			},
		})
	}
	closeBudgetDialog()
}

// Fetch categories on mount
onMounted(() => {
	fetchCategories()
})
</script>
