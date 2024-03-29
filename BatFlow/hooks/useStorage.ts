import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useStorage = (key: string, initialValue?: unknown = null) => {
  const [data, setData] = useState(initialValue)
  const [timestamp, setTimestamp] = useState((new Date()).getTime())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem(key as string)
        if (!value) return
        setData(JSON.parse(value) || initialValue)
      } catch (error) {
        console.error(`useAsyncStorage getItem ${key} error:`, error)
      }
    }

    fetchData()
  }, [key, timestamp])

  const setNewData = async (value: unknown) => {
    try {
      await AsyncStorage.setItem(key as string, JSON.stringify(value))
      setData(value)
    } catch (error) {
      console.error(`useAsyncStorage setItem ${key} error:`, error)
    }
  }

  const refresh = () => {
    setTimestamp((new Date()).getTime())
  }

    return [data, setNewData, refresh]
}

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
       console.error(`useAsyncStorage clear error:`, error)
     }
}