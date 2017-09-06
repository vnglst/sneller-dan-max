import React, { Component } from "react"
import { Modal, Text, TouchableHighlight, View, StyleSheet } from "react-native"

export default class NewHighscore extends Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
      >
        <View style={styles.container}>
          <View>
            <Text>Nieuwe highscore!</Text>
            <TouchableHighlight onPress={this.props.onCloseModal}>
              <Text>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
})

