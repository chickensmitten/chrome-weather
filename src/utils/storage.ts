import { OpenWeatherTempScale } from './api'

export interface LocalStorage {
  cities?: string[]
  options?: LocalStorageOptions
}

export interface LocalStorageOptions {
  hasAutoOverlay: boolean
  homeCity: string
  tempScale: OpenWeatherTempScale
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = {
    cities,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve() // resolve function is needed for the handler that is waiting for the promise to complete will never resolve
    })
  })
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['cities']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities ?? [])
    })
  })
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve() // resolve function is needed for the handler that is waiting for the promise to complete will never resolve
    })
  })
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options)
    })
  })
}
