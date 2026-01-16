<template>
	<div class="bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
		<div class="p-5 lg:p-6">
			<!-- Title at Top - Full Width -->
			<div class="mb-4">
				<h3 class="text-xl font-bold text-foreground leading-tight">
					{{ product.title }}
				</h3>
			</div>

			<!-- Image + Info Section -->
			<div class="flex flex-col lg:flex-row gap-5 mb-5">
				<!-- Product Image Carousel - Left Side -->
				<div class="relative w-full lg:w-80 h-64 lg:h-80 bg-white rounded-lg flex-shrink-0 flex items-center justify-center p-4 border border-border/50">
					<div class="relative w-full h-full group">
						<!-- Images -->
						<div
							v-if="product.gallery.images.length > 0"
							class="relative w-full h-full touch-pan-y"
							@touchstart="handleTouchStart"
							@touchmove="handleTouchMove"
							@touchend="handleTouchEnd"
						>
							<img
								v-for="(image, index) in product.gallery.images"
								:key="index"
								:src="image"
								:alt="`${product.title} - Image ${index + 1}`"
								class="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
								:class="currentImageIndex === index ? 'opacity-100' : 'opacity-0'"
								@error="handleImageError"
							>
						</div>
						<div
							v-else
							class="w-full h-full flex items-center justify-center bg-muted rounded-lg"
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
								class="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
								@click="previousImage"
							>
								<Icon
									name="mdi:chevron-left"
									size="16"
								/>
							</button>
							<button
								type="button"
								class="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
								@click="nextImage"
							>
								<Icon
									name="mdi:chevron-right"
									size="16"
								/>
							</button>

							<!-- Image Indicators -->
							<div class="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
								<button
									v-for="(_, index) in product.gallery.images"
									:key="index"
									type="button"
									class="w-1.5 h-1.5 rounded-full transition-all"
									:class="currentImageIndex === index ? 'bg-primary w-4' : 'bg-muted-foreground/40'"
									@click="currentImageIndex = index"
								/>
							</div>
						</template>
					</div>

					<!-- Overall Score Badge -->
					<div class="absolute -top-2 -right-2">
						<div
							class="px-3 py-1.5 rounded-full font-bold text-sm shadow-xl backdrop-blur-sm"
							:class="getScoreColor(product.overallScore)"
						>
							{{ product.overallScore.toFixed(1) }}
						</div>
					</div>
				</div>

				<!-- Info Next to Image -->
				<div class="flex-1 flex flex-col justify-between space-y-3 lg:space-y-4">
					<!-- Price -->
					<div>
						<div class="flex items-baseline gap-2">
							<span class="text-2xl lg:text-3xl font-bold text-primary">
								{{ formatPrice(product.price) }}
							</span>
						</div>
					</div>

					<!-- Scores Grid -->
					<div class="grid grid-cols-3 gap-1.5 lg:gap-2">
						<div class="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-1.5 lg:p-2 text-center border border-blue-200/30 dark:border-blue-800/30">
							<div class="text-[10px] lg:text-xs font-medium text-muted-foreground mb-0.5">
								Price
							</div>
							<div class="text-base lg:text-lg font-bold text-blue-600 dark:text-blue-400">
								{{ product.priceScore.toFixed(1) }}
							</div>
						</div>
						<div class="bg-purple-50/50 dark:bg-purple-950/20 rounded-lg p-1.5 lg:p-2 text-center border border-purple-200/30 dark:border-purple-800/30">
							<div class="text-[10px] lg:text-xs font-medium text-muted-foreground mb-0.5">
								Features
							</div>
							<div class="text-base lg:text-lg font-bold text-purple-600 dark:text-purple-400">
								{{ product.featureScore.toFixed(1) }}
							</div>
						</div>
						<div class="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg p-1.5 lg:p-2 text-center border border-emerald-200/30 dark:border-emerald-800/30">
							<div class="text-[10px] lg:text-xs font-medium text-muted-foreground mb-0.5">
								Reliability
							</div>
							<div class="text-base lg:text-lg font-bold text-emerald-600 dark:text-emerald-400">
								{{ product.reliabilityScore.toFixed(1) }}
							</div>
						</div>
					</div>

					<!-- AI Recommendation -->
					<div class="bg-primary/5 rounded-lg p-2.5 lg:p-3 border border-primary/10 flex-1">
						<div class="flex items-start gap-2 mb-1.5">
							<Icon
								name="material-symbols-light:lightbulb-outline"
								size="16"
								class="text-primary mt-0.5 flex-shrink-0"
							/>
							<h4 class="font-bold text-foreground text-xs lg:text-sm">
								AI Recommendation
							</h4>
						</div>
						<p class="text-xs lg:text-sm text-foreground/70 leading-relaxed">
							{{ product.reasoning }}
						</p>
					</div>
				</div>
			</div>

			<!-- Content Below - Full Width -->
			<div class="space-y-3">
				<!-- Details in Subtle Colored Cards -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
					<!-- Brand Summary -->
					<div class="bg-amber-50/50 dark:bg-amber-950/10 rounded-lg overflow-hidden border border-amber-200/30 dark:border-amber-800/20">
						<div class="flex items-center gap-1.5 px-3 py-2">
							<Icon
								name="material-symbols-light:verified-outline"
								size="16"
								class="text-amber-600/70 dark:text-amber-400/70 flex-shrink-0"
							/>
							<span class="font-semibold text-sm text-foreground">Brand & Reliability</span>
						</div>
						<div class="px-3 pb-3 text-sm text-muted-foreground leading-relaxed">
							{{ product.brandSummary }}
						</div>
					</div>

					<!-- Feature Summary -->
					<div class="bg-indigo-50/50 dark:bg-indigo-950/10 rounded-lg overflow-hidden border border-indigo-200/30 dark:border-indigo-800/20">
						<div class="flex items-center gap-1.5 px-3 py-2">
							<Icon
								name="material-symbols-light:tune-rounded"
								size="16"
								class="text-indigo-600/70 dark:text-indigo-400/70 flex-shrink-0"
							/>
							<span class="font-semibold text-sm text-foreground">Key Features</span>
						</div>
						<div class="px-3 pb-3 text-sm text-muted-foreground leading-relaxed">
							{{ product.featureSummary }}
						</div>
					</div>

					<!-- Review Summary -->
					<div class="bg-rose-50/50 dark:bg-rose-950/10 rounded-lg overflow-hidden border border-rose-200/30 dark:border-rose-800/20">
						<div class="flex items-center gap-1.5 px-3 py-2">
							<Icon
								name="material-symbols-light:rate-review-outline"
								size="16"
								class="text-rose-600/70 dark:text-rose-400/70 flex-shrink-0"
							/>
							<span class="font-semibold text-sm text-foreground">Customer Reviews</span>
						</div>
						<div class="px-3 pb-3 text-sm text-muted-foreground leading-relaxed">
							{{ product.reviewSummary }}
						</div>
					</div>
				</div>

				<!-- View Product Button -->
				<Button
					as="a"
					:href="product.productUrl"
					target="_blank"
					rel="noopener noreferrer"
					class="w-full"
					size="lg"
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
	</div>
</template>

<script setup lang="ts">
import type { ComparisonResponse } from '~/types/search'

const props = defineProps<{
	product: ComparisonResponse
}>()

const currentImageIndex = ref(0)

// Touch swipe handling
let touchStartX = 0
let touchEndX = 0
const minSwipeDistance = 50

const handleTouchStart = (e: TouchEvent) => {
	const touch = e.changedTouches[0]
	if (touch) {
		touchStartX = touch.screenX
	}
}

const handleTouchMove = (e: TouchEvent) => {
	const touch = e.changedTouches[0]
	if (touch) {
		touchEndX = touch.screenX
	}
}

const handleTouchEnd = () => {
	const swipeDistance = touchStartX - touchEndX

	if (Math.abs(swipeDistance) > minSwipeDistance) {
		if (swipeDistance > 0) {
			// Swiped left - go to next image
			nextImage()
		}
		else {
			// Swiped right - go to previous image
			previousImage()
		}
	}

	// Reset values
	touchStartX = 0
	touchEndX = 0
}

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
