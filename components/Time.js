import React from "react"
import { StyleSheet, Text, View, Animated, Easing } from "react-native"


export default class Time extends React.PureComponent {
  componentWillMount() {
    this.animatedValue = new Animated.Value(1)
  }

  componentWillUpdate() {
    this.animatedValue = new Animated.Value(2.5)
  }

  componentDidUpdate() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 700,
      easing: Easing.bounce
    }).start()
  }

  render() {
    const { timeStr } = this.props
    const animatedStyle = { transform: [{ scale: this.animatedValue }] }
    return (
      <Animated.View style={[animatedStyle]}>
        <Text style={styles.timeText}>
          { timeStr }
        </Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  timeText: {
    marginTop: 0,
    fontFamily: "Menlo-Regular",
    fontSize: 40
  }
})
