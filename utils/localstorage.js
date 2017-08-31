import { AsyncStorage } from "react-native"

export const getStateFromLocalstorage = async () => {
  const result = await AsyncStorage.getItem("@AppStateStore:key")
  if (!result) return null
  const state = JSON.parse(result)
  console.log("Retrieved state from localstorage:", state)
  return state
}

export const setStateFromLocalstorage = state => {
  console.log("Saving state", state)
  return AsyncStorage.setItem("@AppStateStore:key", JSON.stringify(this.state))
}
