import { useCallback, useMemo, useState } from 'react'

export const useLocalStorage = (keyName: string, defaultValue: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName)

      if (value) {
        return JSON.parse(value)
      } else {
        localStorage.setItem(keyName, JSON.stringify(defaultValue))

        return defaultValue
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return defaultValue
    }
  })

  const setValue = useCallback(
    (newValue: unknown) => {
      try {
        localStorage.setItem(keyName, JSON.stringify(newValue))
      } catch (err) {
        console.log(err)
      }

      setStoredValue(newValue)
    },
    [keyName],
  )

  return useMemo(() => {
    return [storedValue, setValue]
  }, [setValue, storedValue])
}
