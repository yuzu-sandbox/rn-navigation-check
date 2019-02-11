import React from "react"
import { Text, Button, View } from "react-native"
import { connect } from "react-redux"
import { NavigationActions } from "react-navigation"

class Home extends React.Component {
  constructor(props) {
    super(props)
    console.log(Object.keys(props))
  }
  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate("Hina")
            // NavigationActions.navigate({ key: "Hina" })
          }}
          title="Click me!"
        />
      </View>
    )
  }
}

function Hina(props) {
  console.log("Hina Component")
  console.log(Object.keys(props))
  return (
    <View>
      <Text>Hinatazaka46</Text>
      <Button title="back" onPress={() => {props.dispatch(NavigationActions.back())}} />
    </View>
  )
}
const HinaConnect = connect()(Hina)

export { Home, HinaConnect as Hina }
