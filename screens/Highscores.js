import React from "react"
import {
  FlatList,
  ListView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native"
import Separator from "../components/Separator"

export default class Highscores extends React.Component {
  static navigationOptions = { title: "Highscores" }

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    this.state = {
      dataSource: this.ds.cloneWithRows(
        this.props.navigation.state.params.highscores
      )
    }
  }

  renderRow(item, i, j, b) {
    const position = parseInt(j, 10) + 1
    return <View>
        <View style={styles.rowContainer}>
          <Text style={styles.item}> {position}</Text>
          <Text style={styles.item}>{item.name}</Text>
          <Text style={styles.item}>{item.record}</Text>
        </View>
        <Separator />
      </View>
  }

  renderHeader() {
    return <View>
        <View style={[styles.rowContainer, styles.header]}>
          <Text style={[styles.item, styles.headerItem]}>🏆</Text>
          <Text style={[styles.item, styles.headerItem]}>Naam  </Text>
          <Text style={[styles.item, styles.headerItem]}>Tijd  </Text>
        </View>
        <Separator />
      </View>
  }

  render() {
    const { navigate } = this.props.navigation
    const { highscores, isLoading } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={isLoading} size="large" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={this.renderHeader}
          enableEmptySections={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  rowContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerItem: {
    fontWeight: 'bold'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
})
