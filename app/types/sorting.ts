export type SortOption = 'overall' | 'price' | 'features' | 'reliability'

export interface SortOptionInfo {
	value: SortOption
	label: string
	icon: string
	description: string
}

export const sortOptions: SortOptionInfo[] = [
	{
		value: 'overall',
		label: 'Overall Score',
		icon: 'material-symbols-light:star-rounded',
		description: 'Best overall value',
	},
	{
		value: 'price',
		label: 'Value for Money',
		icon: 'material-symbols-light:payments-rounded',
		description: 'Best value for money',
	},
	{
		value: 'features',
		label: 'Feature Set',
		icon: 'material-symbols-light:category-rounded',
		description: 'Most features',
	},
	{
		value: 'reliability',
		label: 'Reliability',
		icon: 'material-symbols-light:verified-rounded',
		description: 'Most reliable',
	},
]
