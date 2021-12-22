import React from 'react';
import {  
  View, 
  StyleSheet, 
} from 'react-native';

const People = () => {
  return(
    <View style={styles.container}> 
        <View style={styles.circle}></View>
        <View style={styles.box}></View>
        <View style={styles.box1}></View>
        <View style={styles.circle1}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: 'black',
   },

  circle:{
    top:"40%",
    width: "5%",
    height: "2.3%",
    backgroundColor:'skyblue',
    position: 'absolute',
    borderRadius:15,
    shadowColor: 'white',  
    shadowOffset:{width:0,height:0}, 
    shadowOpacity: 2,
   },

  box:{
    top: "43%",
    width: "5%",
    height:"5%",
    backgroundColor:'skyblue',
    position: 'absolute',
    shadowColor: 'white',  
    shadowOffset:{width:0,height:0}, 
    shadowOpacity: 2,
  },

  circle1:{
    top: "55%",
    width: "5%",
    height: "2.3%",
    backgroundColor:'grey',
    position: 'absolute',
    borderRadius:15,
    shadowColor: 'white',  
    shadowOffset:{width:0,height:0}, 
    shadowOpacity: 1,
   },

  box1:{
    top: "49%",
    width: "5%",
    height:"5%",
    backgroundColor:'grey',
    position: 'absolute',
    shadowColor: 'white',  
    shadowOffset:{width:0,height:0}, 
    shadowOpacity: 1,
  },
  
});


export default People;