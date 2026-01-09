export interface SearchRequest {
	categoryId: string
	maxBudget: number
}

export interface Gallery {
	images: string[]
}

export interface ComparisonResponse {
	title: string
	price: number
	priceScore: number
	featureScore: number
	reliabilityScore: number
	overallScore: number
	reasoning: string
	productUrl: string
	gallery: Gallery
}
