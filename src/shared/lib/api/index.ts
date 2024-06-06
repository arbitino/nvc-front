import type { FetchContext, FetchOptions, SearchParameters } from 'ofetch'
import { $fetch } from 'ofetch'
import { useFailedToast } from '@/shared/ui/toast'

interface ApiConfig {
    fetchOptions: FetchOptions<'json'>
    apiVersion: string
}

export class Api {
    constructor(private config: ApiConfig) {
        if (this.config.apiVersion) {
            this.config.fetchOptions.baseURL += `/${this.config.apiVersion}`
        }
    }

    public async get<T>(endpoint: string, params?: SearchParameters): Promise<T> {
        return await $fetch<T>(endpoint, this.fetchOptions(params))
    }

    public async update<T>(endpoint: string, params?: SearchParameters): Promise<T | undefined> {
        return await $fetch<T>(endpoint, this.fetchOptions(params, 'PUT'))
    }

    public async store<T>(endpoint: string, params?: SearchParameters): Promise<T | undefined> {
        return await $fetch<T>(endpoint, this.fetchOptions(params, 'POST'))
    }

    public async delete<T>(endpoint: string, params?: SearchParameters): Promise<T | undefined> {
        return await $fetch<T>(endpoint, this.fetchOptions(params, 'DELETE'))
    }

    public get baseUrl(): string | undefined {
        return this.config.fetchOptions.baseURL
    }

    private fetchOptions(params?: SearchParameters, method = 'GET'): FetchOptions<'json'> {
        const fetchOptions = this.config.fetchOptions

        fetchOptions.headers = {
            Accept: 'application/json'
        }

        fetchOptions.method = method

        fetchOptions.onResponseError = (context: FetchContext) => {
            useFailedToast(context.error?.message || `Ошибка запроса ${context.request}`)
        }

        delete this.config.fetchOptions.body
        delete this.config.fetchOptions.params

        if (params) {
            if (method === 'POST' || method === 'PUT') {
                if (params.headers) {
                    this.config.fetchOptions.headers = params.headers
                }

                this.config.fetchOptions.body = params.body || params
            } else {
                this.config.fetchOptions.params = params
            }
        }

        return this.config.fetchOptions
    }
}
