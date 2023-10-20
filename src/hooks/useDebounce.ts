import { useEffect, useState } from "react"

const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<string>();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeOut)
  }, [value, delay])
  

  return debouncedValue
}

export default useDebounce