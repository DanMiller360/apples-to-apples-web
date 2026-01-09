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

				<!-- Products Grid -->
				<div
					v-else
					class="grid grid-cols-1 lg:grid-cols-2 gap-8"
				>
					<ProductCard
						v-for="(product, index) in products"
						:key="index"
						:product="product"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ComparisonResponse } from '~/types/search'

const route = useRoute()
const api = useApi()

const categoryId = ref<string>(route.query.categoryId as string || '')
const categoryName = ref<string>(route.query.categoryName as string || '')
const budget = ref<number>(Number(route.query.budget) || 0)

const products = ref<ComparisonResponse[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const formatBudget = computed(() => {
	return new Intl.NumberFormat('en-ZA', {
		style: 'currency',
		currency: 'ZAR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(budget.value)
})

const fetchProducts = async () => {
	if (!categoryId.value || !budget.value) {
		error.value = 'Missing category or budget information'
		loading.value = false
		return
	}

	loading.value = true
	error.value = null

	try {
		products.value = await api.search.searchAndCompare({
			categoryId: categoryId.value,
			maxBudget: budget.value,
		})

		// Sort by overall score descending
		products.value.sort((a, b) => b.overallScore - a.overallScore)
	}
	catch (err) {
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
</script>
