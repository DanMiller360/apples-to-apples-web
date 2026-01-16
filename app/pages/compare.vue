<template>
	<div class="min-h-screen bg-gradient-to-br from-primary/60 via-accent/70 to-background/100">
		<HeaderBar />

		<div class="container mx-auto px-6 py-12">
			<div class="max-w-7xl mx-auto">
				<!-- Header -->
				<div class="mb-8 mt-12">
					<Button
						variant="outline"
						class="mb-4"
						@click="navigateTo('/')"
					>
						<Icon
							name="material-symbols-light:arrow-left-alt-rounded"
							class="mr-2"
							size="16"
						/>
						Back to Categories
					</Button>

					<h1 class="text-4xl font-bold text-foreground mb-2">
						Product Comparison
					</h1>
					<p class="text-muted-foreground text-lg">
						<span v-if="categoryName">{{ categoryName }} • </span>
						Budget: <span class="font-semibold text-foreground">{{ formatBudget }}</span>
					</p>
				</div>

				<!-- Loading State -->
				<div
					v-if="loading"
					class="bg-card/80 backdrop-blur-sm rounded-lg border border-border shadow-md"
				>
					<AiLoadingAnimation />
				</div>

				<!-- Error State -->
				<ErrorState
					v-else-if="error"
					title="Failed to load products"
					@retry="fetchProducts"
				/>

				<!-- No Results -->
				<div
					v-else-if="products.length === 0"
					class="text-center py-12"
				>
					<Icon
						name="material-symbols-light:sentiment-sad-outline-rounded"
						size="64"
						class="text-muted-foreground mx-auto mb-4"
					/>
					<h2 class="text-2xl font-bold text-foreground mb-2">
						No Products Found
					</h2>
					<p class="text-muted-foreground mb-6">
						Try adjusting your budget or selecting a different category
					</p>
					<Button @click="navigateTo('/')">
						Back to Categories
					</Button>
				</div>

				<!-- Products Grid with Sorting -->
				<div v-else>
					<!-- Sort Controls -->
					<div class="mb-6 bg-card/80 backdrop-blur-sm rounded-lg border border-border shadow-md p-4">
						<div class="flex items-center justify-between flex-wrap gap-4">
							<div class="flex items-center gap-2">
								<Icon
									name="material-symbols-light:sort-rounded"
									size="20"
									class="text-muted-foreground"
								/>
								<span class="text-sm font-medium text-muted-foreground">Sort by:</span>
							</div>
							<div class="flex flex-wrap gap-2">
								<Button
									v-for="option in sortOptions"
									:key="option.value"
									:variant="sortBy === option.value ? 'default' : 'outline'"
									size="sm"
									class="transition-all"
									@click="sortBy = option.value"
								>
									<Icon
										:name="option.icon"
										class="mr-2"
										size="16"
									/>
									{{ option.label }}
								</Button>
							</div>
						</div>
					</div>

					<!-- Products Grid -->
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<ProductCard
							v-for="(product, index) in sortedProducts"
							:key="index"
							:product="product"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ComparisonResponse } from '~/types/search'
import type { SortOption } from '~/types/sorting'
import { sortOptions } from '~/types/sorting'

const route = useRoute()
const api = useApi()

const categoryId = ref<string>(route.query.categoryId as string || '')
const categoryName = ref<string>(route.query.categoryName as string || '')
const budget = ref<number>(Number(route.query.budget) || 0)

const products = ref<ComparisonResponse[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const sortBy = ref<SortOption>('overall')

// AbortController for canceling requests
let abortController: AbortController | null = null

const formatBudget = computed(() => {
	return new Intl.NumberFormat('en-ZA', {
		style: 'currency',
		currency: 'ZAR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(budget.value)
})

const sortedProducts = computed(() => {
	const productsCopy = [...products.value]

	return productsCopy.sort((a, b) => {
		switch (sortBy.value) {
			case 'price':
				return b.priceScore - a.priceScore
			case 'features':
				return b.featureScore - a.featureScore
			case 'reliability':
				return b.reliabilityScore - a.reliabilityScore
			case 'overall':
			default:
				return b.overallScore - a.overallScore
		}
	})
})

const fetchProducts = async () => {
	if (!categoryId.value || !budget.value) {
		error.value = 'Missing category or budget information'
		loading.value = false
		return
	}

	// Cancel any previous request
	if (abortController) {
		abortController.abort()
	}

	// Create new abort controller for this request
	abortController = new AbortController()

	loading.value = true
	error.value = null

	try {
		products.value = await api.search.searchAndCompare({
			categoryId: categoryId.value,
			maxBudget: budget.value,
		}, abortController.signal)
	}
	catch (err) {
		// Ignore abort errors
		if (err instanceof Error && err.name === 'AbortError') {
			return
		}
		error.value = err instanceof Error ? err.message : 'An unknown error occurred'
	}
	finally {
		loading.value = false
	}
}

// Fetch products on mount
onMounted(() => {
	fetchProducts()
})

// Cancel request on unmount
onUnmounted(() => {
	if (abortController) {
		abortController.abort()
	}
})
</script>
