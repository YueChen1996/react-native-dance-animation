// import React from 'react';
// import { 
//   TouchableOpacity,  
//   View, 
//   StyleSheet, 
//   Text
// } from 'react-native';
// import { Icon} from 'react-native-elements';



// export default function GetMusic ({navigation}){

  
//     return (
//       <View style={styles.container}>
//       <TouchableOpacity style = {styles.homeButton} onPress={() => {navigation.navigate('Home')}}>
//          <View>
//           <Icon
//             name='home'
//             type='font-awesome'
//             color='white'
//             size={60}
//           />
//         </View>
//       </TouchableOpacity>
//       </View>
//     );
//    }




// const styles = StyleSheet.create({
//   inputStyle: {
//     padding: 50,
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 5,
//   },

//   container: {
//     flex: 1,
//     alignItems: 'center', 
//     flexDirection: 'column',
//     justifyContent: 'center',
//     backgroundColor: 'black',
//   },
  
//    homeButton: {
//     bottom: 50,
//     alignItems: 'center', 
//     flexDirection: 'column',
//     justifyContent: 'center',
//     position: 'absolute',
//   },

// });


import React, { useRef, useState } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Image } from "react-native";

function GetMusic(){

  
    // const [x, setX] = useState(0);
    // const [y, setY] = useState(0);
    const [action, setAction] = useState('unknown');
    const [refreshPage, setRefreshPage] = useState("");
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
          null,
          { dx: pan.x, dy: pan.y }
        ]),
        onPanResponderRelease: () => {
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
          // setX(pan.x);
          // setY(pan.y);
          x = Number(JSON.stringify(pan.x));
          y = Number(JSON.stringify(pan.y));
          
          (x > 0 ) ? setAction('like') : setAction('dislike');
       
         (Math.abs(x) < Math.abs(y)) ? setAction('unknown') : null;
        }, 
       
      })
    ).current;

    console.log(pan.x, pan.y, action)

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.moviePoster, {
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }]}
        {...panResponder.panHandlers}
        >
        <Image  source={require('../images/start.png')}/>
      </Animated.View>
     <Text style={{bottom: 20}}> {action} </Text > 

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  },
  moviePoster: {
    height: '70%',
    bottom: 15,
    width: '90%',
    alignItems: 'center', 
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
});

export default GetMusic;
