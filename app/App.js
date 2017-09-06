import React from "react"
import { StackNavigator } from "react-navigation"
import Home from "./screens/Home"
import About from "./screens/About"
import Highscores from "./screens/Highscores"

export default (App = StackNavigator({
  Home: { screen: Home },
  About: { screen: About },
  Highscores: { screen: Highscores }
}))
