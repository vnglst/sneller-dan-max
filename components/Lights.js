import React from "react"
import { StyleSheet, View } from "react-native"

const Lamp = ({ on }) => (
  <View style={styles.light}>
    <View style={[styles.lamp, styles.off]} />
    <View style={[styles.lamp, styles.off]} />
    <View style={[styles.lamp, on ? styles.on : styles.off]} />
    <View style={[styles.lamp, on ? styles.on : styles.off]} />
  </View>
)

export default (Lights = ({ numberOfLightsOn }) => {
  const lamps = []
  for (let i = 0; i < 5; i++) {
    lamps.push(<Lamp key={i} on={i < numberOfLightsOn ? false : true} />)
  }
  return <View style={styles.lightsContainer}>{lamps}</View>
})

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
    borderRadius: 10,
    alignItems: 'center'
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