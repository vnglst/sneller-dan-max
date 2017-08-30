import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { formatTime } from "../utils"

export default Time = ({ time }) => (
  <Text style={styles.time}>
    {time === "jump start" ? "JUMP START" : formatTime(time)}
  </Text>
)

const styles = StyleSheet.create({
  time: {
    marginTop: 50,
    // fontFamily: "Menlo-Regular",
    fontSize: 40
  }
})
