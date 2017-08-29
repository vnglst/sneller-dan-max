import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"

const Lamp = ({ on }) => (
  <View style={styles.light}>
    <View style={[styles.lamp, styles.off]} />
    <View style={[styles.lamp, styles.off]} />
    <View style={[styles.lamp, on ? styles.on : styles.off]} />
    <View style={[styles.lamp, on ? styles.on : styles.off]} />
  </View>
)

export default Lights = ({ redLights }) => {
  const lamps = []
  for (let i = 0; i < 5; i++) {
    lamps.push(<Lamp key={i} on={i < redLights ? false : true} />)
  }
  return <View style={styles.lightsContainer}>{lamps}</View>
}

const styles = StyleSheet.create({
  lightsContainer: {
    flex: 0,
    flexDirection: "row",
    marginBottom: 50
  },
  light: {
    flex: 1,
    margin: 4,
    backgroundColor: "black",
    borderRadius: 10
  },
  lamp: {
    margin: 5,
    backgroundColor: "red",
    padding: 5,
    width: 50,
    height: 50,
    borderRadius: 50
  },
  on: {
    backgroundColor: "red"
  },
  off: {
    backgroundColor: "#333"
  }
})