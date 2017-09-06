import React, { Component } from "react"
import { View, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    backgroundColor: "#E4E4E4",
    height: 1,
  }
})

export default function Separator(props) {
  return <View style={styles.separator} />
}
