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

const MetalRod = () => <View style={styles.rod} />

export default (Lights = ({ numberOfLightsOn }) => {
  const lamps = []
  for (let i = 0; i < 5; i++) {
    lamps.push(<Lamp key={i} on={i < numberOfLightsOn ? false : true} />)
  }
  return <View style={styles.lightsContainer}>
    {lamps}
    <MetalRod />
    </View>
})

const styles = StyleSheet.create({
  lightsContainer: {
    flexDirection: "row",
    margin: 5
  },
  light: {
    margin: 4,
    backgroundColor: "black",
    borderRadius: 10,
    alignItems: 'center'
  },
  lamp: {
    margin: 5,
    backgroundColor: "red",
    padding: 5,
    width: 45,
    height: 45,
    borderRadius: 45
  },
  on: {
    backgroundColor: "red"
  },
  off: {
    backgroundColor: "#333"
  },
  rod: {
    position: 'absolute',
    top: 105,
    margin: 5,
    width: 300,
    height: 10,
    backgroundColor: "black"
  }
})