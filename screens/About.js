import React from "react"
import { Button } from "react-native"

export default class About extends React.Component {
  static navigationOptions = {
    title: "About"
  }
  render() {
    const { navigate } = this.props.navigation
    console.log('about screen props', this.props)
    return (
      <Button
        title="Go to highscores"
        onPress={() => {navigate("Highscores", { name: "Jane" })}}
      />
    )
  }
}
