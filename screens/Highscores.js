import React from "react"
import { AppRegistry, FlatList, StyleSheet, Text, View } from "react-native"

export default class Highscores extends React.Component {
  static navigationOptions = {
    title: "Highscores"
  }

  componentWillMount() {
    this.data = [
            { key: "Devin", time: 302 },
            { key: "Jackson", time: 201 },
            { key: "James", time: 199 },
            { key: "Joel", time: 233 },
            { key: "John", time: 288 },
            { key: "Jillian", time: 222 },
            { key: "Jimmy", time: 302 },
            { key: "Julie", time: 400 }
          ].sort((a, b) => a.time < b.time ? -1 : 1)
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <FlatList
          data={this.data}
          renderItem={({ item }) => <Text style={styles.item}>{`${item.key}: ${item.time}`}</Text>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingVertical: 50
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
})
