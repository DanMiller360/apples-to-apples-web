<template>
	<div class="min-h-screen bg-gradient-to-br from-primary/60 via-accent/70 to-background/100">
		<HeaderBar />

		<div class="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
			<div class="max-w-7xl mx-auto">
				<Button
					variant="outline"
					class="mb-4 mt-12"
					@click="navigateTo('/')"
				>
					<Icon
						name="material-symbols-light:arrow-left-alt-rounded"
						class="mr-2"
						size="16"
					/>
					Back to Home
				</Button>

				<!-- Content Card -->
				<div class="bg-card/90 backdrop-blur-sm rounded-2xl border border-border shadow-2xl p-6 sm:p-8 lg:p-12">
					<!-- Tagline -->
					<h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-primary mb-6 sm:mb-8">
						Compare smarter. Shop better. Save time.
					</h1>
					<div class="space-y-4 text-foreground/80 text-sm sm:text-base lg:text-lg leading-relaxed">
						<p>
							Stop drowning in endless product reviews and confusing specifications. <span class="font-semibold text-foreground">Apples to Apples</span> leverages the power of AI to cut through the noise and deliver personalized product recommendations you can trust.
						</p>

						<p>
							Simply tell us your budget and what you're looking for. AI-powered analysis compares prices, features, and real customer reviews to find the perfect match for your needs. No more second-guessing – just clear, confident purchasing decisions.
						<!-- Features -->
						</p>
						<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
							<div class="bg-primary/10 dark:bg-primary/20 rounded-lg p-3 sm:p-4 border border-primary/20">
								<div class="flex justify-center mb-2">
									<Icon
										name="material-symbols-light:psychology-rounded"
										size="32"
										class="text-primary"
									/>
								</div>
								<h3 class="font-bold text-center text-foreground mb-1 text-sm sm:text-base">
									AI-Powered
								</h3>
								<p class="text-xs sm:text-sm text-center text-foreground/70">
									Smart algorithms analyze products to find your best match
								</p>
							</div>

							<div class="bg-blue-50 dark:bg-blue-950/40 rounded-lg p-3 sm:p-4 border border-blue-200/50 dark:border-blue-700/50">
								<div class="flex justify-center mb-2">
									<Icon
										name="material-symbols-light:compare-arrows-rounded"
										size="32"
										class="text-blue-600 dark:text-blue-400"
									/>
								</div>
								<h3 class="font-bold text-center text-foreground mb-1 text-sm sm:text-base">
									Easy Comparison
								</h3>
								<p class="text-xs sm:text-sm text-center text-foreground/70">
									Side-by-side comparisons with clear ratings and insights
								</p>
							</div>

							<div class="bg-emerald-50 dark:bg-emerald-950/40 rounded-lg p-3 sm:p-4 border border-emerald-200/50 dark:border-emerald-700/50">
								<div class="flex justify-center mb-2">
									<Icon
										name="material-symbols-light:savings-rounded"
										size="32"
										class="text-emerald-600 dark:text-emerald-400"
									/>
								</div>
								<h3 class="font-bold text-center text-foreground mb-1 text-sm sm:text-base">
									Budget-Friendly
								</h3>
								<p class="text-xs sm:text-sm text-center text-foreground/70">
									Find the best value within your price range
								</p>
							</div>
						</div>

						<!-- CTA -->
						<div class="flex justify-center mt-8 sm:mt-10">
							<Button
								size="lg"
								class="w-full sm:w-auto"
								@click="navigateTo('/')"
							>
								Start Comparing Now
								<Icon
									name="material-symbols-light:arrow-right-alt-rounded"
									class="ml-2"
									size="20"
								/>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
</script>
