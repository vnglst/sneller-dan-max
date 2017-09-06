import React from "react"
import { StyleSheet, Text, View, Linking } from "react-native"

export default class About extends React.Component {
  static navigationOptions = {
    title: "About"
  }
  render() {
    const { navigate } = this.props.navigation
    return <View style={styles.aboutContainer}>
        <View style={styles.leftView}>
          <Text style={styles.aboutText}>👨‍💻</Text>
        </View>
        <View style={styles.rightView}>
          <Text style={styles.text}>
            App created by Koen van Gilst <Text style={{ color: "blue" }} onPress={() => Linking.openURL("https://twitter.com/vnglst")}>
              @vnglst
            </Text>.
          </Text>
          <Text style={styles.text}>
            Based on the <Text style={{ color: "blue" }} onPress={() => Linking.openURL("https://f1-start.glitch.me/")}>
              web app
            </Text> by Jake Archibald <Text style={{ color: "blue" }} onPress={() => Linking.openURL("https://twitter.com/jaffathecake")}>
              @jaffathecake
            </Text>.
          </Text>
          <Text style={styles.text}>
            <Text style={{ color: "blue" }} onPress={() => Linking.openURL("https://koenvangilst.nl/")}>
              koenvangilst.nl
            </Text>
          </Text>
        </View>
      </View>
  }
}

const styles = StyleSheet.create({
  aboutContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  leftView: {
    flex: 1,
  },
  aboutText: {
    paddingRight: 20,
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold"
  },
  rightView: {
    flex: 2,
    borderLeftColor: "grey",
    borderLeftWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    marginBottom: 10,
    lineHeight: 20,
    fontSize: 14,
    textAlign: "left"
  }
})
