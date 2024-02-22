import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Storage from "@react-native-async-storage/async-storage"

type Response<T> = [T, Dispatch<SetStateAction<T>>, boolean]

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState<T>(initialState);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    (async () => {
      const storagedValue = await Storage.getItem(key)
      if (storagedValue) {
        setState(JSON.parse(storagedValue))
        setFetched(true)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      await Storage.setItem(key, JSON.stringify(state))
    })()
  }, [key, state])
  
  return [state, setState, fetched];
}

export { usePersistedState };
