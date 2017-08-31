import React from "react"
import { Button } from "react-native"

export default class Highscores extends React.Component {
  static navigationOptions = {
    title: "Highscores"
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <Button
        title="Go to about"
        onPress={() => {navigate("About", { name: "Jane" })}}
      />
    )
  }
}
