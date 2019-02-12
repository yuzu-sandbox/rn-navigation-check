/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import * as React from "react"
import { createStackNavigator } from "react-navigation"
import { Home, Hina } from "./components"
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers"
import { Provider, connect } from "react-redux"
import { combineReducers, createStore, applyMiddleware } from "redux"
import loggerMiddleware from "redux-logger"

// router config
const appRouterConfig = {
  Home: {
    screen: Home
  },
  Hina: {
    screen: Hina
  }
}
const AppNavigator = createStackNavigator(appRouterConfig)

// react navigation redux helper
const navReducer = createNavigationReducer(AppNavigator)
const appReducer = combineReducers({
  nav: navReducer
})

// container
// createReduxContainerの前に呼ばないといけない
const middleware = createReactNavigationReduxMiddleware(state => state.nav)

const App = createReduxContainer(AppNavigator)
const mapStateToProps = state => ({
  state: state.nav
})
const AppWithNavigationState = connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(App)

// store
const store = createStore(appReducer, applyMiddleware(middleware, loggerMiddleware))

// root component
export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
