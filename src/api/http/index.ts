import axios, { AxiosError, type AxiosResponse } from 'axios'
import { toastError } from 'components'

export const API_URL = import.meta.env.VITE_API_URL

export const $api = axios.create({
  baseURL: API_URL,
})

$api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response ? error.response.status : null

    if (status === 500) {
      toastError('Something went wrong, please try later')

      return Promise.reject(error.response)
    }

    return Promise.reject(error)
  },
)
