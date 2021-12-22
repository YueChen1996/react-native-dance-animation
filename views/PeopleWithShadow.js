import React, { Component } from 'react';
import { 
  StyleSheet, 
  View
} from 'react-native';

import Animated from 'react-native-reanimated';


const {
  add,
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
  };

  render(){
    return (
      <View style={styles.container}>
       {/* <Text>people</Text>*/}
        <Animated.View
            style={[styles.circle, {top: divide(this._trans, 45)}]}>
        </Animated.View>
         <View paddingVertical={2} />
        <Animated.View
            style={[styles.box, {top: divide(this._trans, 80)}]}>
        </Animated.View>
         <View paddingVertical={5} />
        
        <Animated.View
            style={[styles.box1, {bottom: divide(this._trans, 80)}]}>
        </Animated.View>
        <View paddingVertical={2} />
       <Animated.View
            style={[styles.circle1, {bottom: divide(this._trans, 45)}]}>
        </Animated.View>
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
    width: "20%",
    height: "14%",
    backgroundColor:'rgb(24,175,242)',
    borderRadius:50,
    shadowColor: 'white',  
    shadowOffset:{width:0,height:0}, 
    shadowOpacity: 1,
    shadowRadius: 8,
   },

  box:{
    width: "20%",
    height:"24%",
    backgroundColor:'rgb(24,175,242)',
    borderRadius:5,
    shadowColor: 'white',  
    shadowOffset:{width:0,height:0}, 
    shadowOpacity: 1,
    shadowRadius: 8,
  },

  circle1:{
    width: "20%",
    height: "14%",
    backgroundColor:'rgb(24,175,242)',
    borderRadius:50,
    shadowColor: 'white',  
    shadowOffset:{width:0,height:0}, 
    shadowOpacity: 1,
    shadowRadius: 1,
    opacity: 0.2,
   },

  box1:{
    width: "20%",
    height:"24%",
    backgroundColor:'rgb(24,175,242)',
    shadowColor: 'white',
    borderRadius:5,  
    shadowOffset:{width:0,height:0}, 
    shadowOpacity: 1,
    shadowRadius: 1,
    opacity: 0.2,
  },
});

export default PeopleWithShadow;