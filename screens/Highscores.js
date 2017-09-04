import React from "react"
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native"

export default class Highscores extends React.Component {
  static navigationOptions = {
    title: "Highscores"
  }

  _keyExtractor = (item, index) => item.name + index

  render() {
    const { navigate } = this.props.navigation
    const { highscores, isLoading } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={isLoading} size="large" />
        <FlatList
          data={highscores}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }, i) => (
            <Text style={styles.item}>{`${item.name}: ${item.record}`}</Text>
          )}
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
