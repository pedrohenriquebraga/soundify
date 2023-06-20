import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Storage from "@react-native-async-storage/async-storage"

type Response<T> = [T, Dispatch<SetStateAction<T>>]

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    (async () => {
      const storagedValue = await Storage.getItem(key)
      if (storagedValue) {
        setState(JSON.parse(storagedValue))
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      await Storage.setItem(key, JSON.stringify(state))
    })()
  }, [key, state])
  
  return [state, setState];
}

export { usePersistedState };
