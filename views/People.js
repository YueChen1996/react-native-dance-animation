import React, { Component } from 'react';
import { 
  StyleSheet, 
  View
} from 'react-native';

import Animated from 'react-native-reanimated';

const {
  divide,
  set,
  cond,
  startClock,
  stopClock,
  clockRunning,
  block,
  spring,
  debug,
  Value,
  Clock,
} = Animated;

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    damping: 0,
    mass: 5,
    stiffness: 101.6,
    overshootClamping: false,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, -2500),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

class PeopleWithShadow extends Component {
  constructor(props) {
    super(props);
    const clock = new Clock();
    this._trans = runSpring(clock, 10, 120);
    //var backgroundColor;
    //(this.props.flag) ? backgroundColor = 'pink' : backgroundColor = 'transparent';
    //console.log(this.props.flag);
  };

  render(){
    return (
      <View style={styles.container}>
        {/*<Text>people</Text>*/}
        <Animated.View
            style={[styles.circle, {top: divide(this._trans, 45), backgroundColor: this.props.backgroundColor}]}>
        </Animated.View>
         <View paddingVertical={2} />
        <Animated.View
            style={[styles.box, {top: divide(this._trans, 80), backgroundColor: this.props.backgroundColor}]}>
        </Animated.View> 
        {/* <View paddingVertical={5} />*/}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    margin: "1%",
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  circle:{
    width: "30%",
    height: "18%",
    backgroundColor:'transparent',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius:15,
   },
  box:{
    width: "30%",
    height:"32%",
    backgroundColor:'transparent',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius:5,
  },
});

export default PeopleWithShadow;