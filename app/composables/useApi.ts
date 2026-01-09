import type { CategoryResponse } from '~/types/category'
import type { SearchRequest, ComparisonResponse } from '~/types/search'

/**
 * Composable for BFF API integration
 * Provides typed API client methods following best practices
 */
export const useApi = () => {
	const config = useRuntimeConfig()
	const apiBase = config.public.apiBase

	/**
	 * Generic fetch wrapper with error handling
	 */
	const apiFetch = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
		try {
			const response = await fetch(`${apiBase}${endpoint}`, {
				...options,
				headers: {
					'Content-Type': 'application/json',
					...options?.headers,
				},
			})

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}))
				throw new Error(errorData.detail || `API Error: ${response.status}`)
			}

			return await response.json()
		}
		catch (error) {
			console.error(`API Error [${endpoint}]:`, error)
			throw error
		}
	}

	return {
		// Category Endpoints
		categories: {
			getAll: () => apiFetch<CategoryResponse[]>('v1/categories'),
		},

		// Search Endpoints
		search: {
			searchAndCompare: (request: SearchRequest) =>
				apiFetch<ComparisonResponse[]>('v1/search-and-compare', {
					method: 'POST',
					body: JSON.stringify(request),
				}),
		},
	}
}
