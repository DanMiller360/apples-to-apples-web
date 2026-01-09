<template>
	<div class="bg-card rounded-lg overflow-hidden border border-border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
		<!-- Product Image Carousel -->
		<div class="relative h-72 bg-muted overflow-hidden group">
			<!-- Images -->
			<div
				v-if="product.gallery.images.length > 0"
				class="relative h-full"
			>
				<img
					v-for="(image, index) in product.gallery.images"
					:key="index"
					:src="image"
					:alt="`${product.title} - Image ${index + 1}`"
					class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
					:class="currentImageIndex === index ? 'opacity-100' : 'opacity-0'"
					@error="handleImageError"
				>
			</div>
			<div
				v-else
				class="w-full h-full flex items-center justify-center bg-muted"
			>
				<Icon
					name="material-symbols-light:hide-image-outline"
					size="48"
					class="text-muted-foreground"
				/>
			</div>

			<!-- Navigation Buttons -->
			<template v-if="product.gallery.images.length > 1">
				<button
					type="button"
					class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
					@click="previousImage"
				>
					<Icon
						name="mdi:chevron-left"
						size="24"
					/>
				</button>
				<button
					type="button"
					class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
					@click="nextImage"
				>
					<Icon
						name="mdi:chevron-right"
						size="24"
					/>
				</button>

				<!-- Image Indicators -->
				<div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
					<button
						v-for="(_, index) in product.gallery.images"
						:key="index"
						type="button"
						class="w-2 h-2 rounded-full transition-all"
						:class="currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'"
						@click="currentImageIndex = index"
					/>
				</div>
			</template>

			<!-- Overall Score Badge -->
			<div class="absolute top-3 right-3">
				<div
					class="px-3 py-1.5 rounded-full font-bold text-sm shadow-lg"
					:class="getScoreColor(product.overallScore)"
				>
					{{ product.overallScore.toFixed(1) }}
				</div>
			</div>
		</div>

		<!-- Product Details -->
		<div class="p-4 flex flex-col flex-grow">
			<!-- Title -->
			<h3 class="text-lg font-semibold text-foreground mb-2 line-clamp-2">
				{{ product.title }}
			</h3>

			<!-- Price -->
			<div class="mb-4">
				<span class="text-2xl font-bold text-primary">
					{{ formatPrice(product.price) }}
				</span>
			</div>

			<!-- Score Breakdown -->
			<div class="space-y-2 mb-4">
				<ScoreBar
					label="Price"
					:score="product.priceScore"
				/>
				<ScoreBar
					label="Features"
					:score="product.featureScore"
				/>
				<ScoreBar
					label="Reliability"
					:score="product.reliabilityScore"
				/>
			</div>

			<!-- Reasoning -->
			<div class="mb-4 flex-grow">
				<p class="text-sm text-muted-foreground line-clamp-3">
					<b>Summary:</b> {{ product.reasoning }}
				</p>
			</div>

			<!-- View Product Button -->
			<Button
				as="a"
				:href="product.productUrl"
				target="_blank"
				rel="noopener noreferrer"
				class="w-full"
			>
				View Product
				<Icon
					name="material-symbols-light:open-in-new"
					class="ml-2"
					size="16"
				/>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ComparisonResponse } from '~/types/search'

const props = defineProps<{
	product: ComparisonResponse
}>()

const currentImageIndex = ref(0)

const nextImage = () => {
	if (props.product.gallery.images.length > 0) {
		currentImageIndex.value = (currentImageIndex.value + 1) % props.product.gallery.images.length
	}
}

const previousImage = () => {
	if (props.product.gallery.images.length > 0) {
		currentImageIndex.value = (currentImageIndex.value - 1 + props.product.gallery.images.length) % props.product.gallery.images.length
	}
}

const formatPrice = (price: number) => {
	return new Intl.NumberFormat('en-ZA', {
		style: 'currency',
		currency: 'ZAR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price)
}

const getScoreColor = (score: number) => {
	if (score >= 8) return 'bg-green-500 text-white'
	if (score >= 6) return 'bg-yellow-500 text-black'
	return 'bg-orange-500 text-white'
}

const handleImageError = (event: Event) => {
	const img = event.target as HTMLImageElement
	img.style.display = 'none'
}
</script>
