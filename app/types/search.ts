export interface SearchRequest {
	categoryId: string
	maxBudget: number
}

export interface Gallery {
	images: string[]
}

export interface ComparisonResponse {
	title: string
	listingPrice: number
	price: number
	priceScore: number
	featureScore: number
	reliabilityScore: number
	overallScore: number
	reasoning: string
	brandSummary: string
	featureSummary: string
	reviewSummary: string
	productUrl: string
	gallery: Gallery
}
