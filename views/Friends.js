import React, {useState, useRef} from 'react';
import { 
  TouchableOpacity,  
  View, 
  StyleSheet, 
  Animated
} from 'react-native';
import { Icon } from 'react-native-elements';

import PeopleWithShadow from "./PeopleWithShadow";
import People from "./People";

export default function Friends ({navigation}){
  const iLeft = useRef(new Animated.Value(150)).current;
  const iTop = useRef(new Animated.Value(50)).current;
  const youLeft = useRef(new Animated.Value(90)).current;
  const youTop = useRef(new Animated.Value(50)).current;
  const [isFound, setIsFound] = useState(false);

  const findFriends = () => {
    
    setIsFound(!isFound);

    (!isFound) ?

    Animated.parallel([
      Animated.timing(iLeft, {
        toValue: 250,
        duration: 1000
      }),
      Animated.timing(iTop, {
        toValue: 100,
        duration: 1000
      }),
      Animated.timing(youLeft, {
        toValue: 280,
        duration: 1000
      }),
      Animated.timing(youTop, {
        toValue: -150,
        duration: 1000
      })
    ]).start() :
  
    Animated.parallel([
      Animated.timing(iLeft, {
        toValue: 150,
        duration: 1000
      }),
      Animated.timing(iTop, {
        toValue: 50,
        duration: 1000
      }),
      Animated.timing(youLeft, {
        toValue: 90,
        duration: 1000
      }),
      Animated.timing(youTop, {
        toValue: 50,
        duration: 1000
      })
    ]).start()
  };

    return (
      <View style={styles.container}>

       <Animated.View style={[styles.logo, {top: iTop, left: iLeft}]}>
          <PeopleWithShadow />
        </Animated.View> 

        <TouchableOpacity style={styles.touchPeopleGroup} onPress={findFriends}>
          <View style={styles.peopleGroup}>
           <People/>
          </View>

          <View style={[styles.peopleGroup, {height: "70%", width: "20%", left: '45%', top: "20%"}]}>
             <People/>
          </View>

          <View style={[styles.peopleGroup, {height: "70%", width: "20%", left: '57%', top: "30%"}]}>
             <People/>
          </View>

          <Animated.View style={[styles.peopleGroup, {height: "70%", width: "20%", left: youLeft, top: youTop}]}>
             <People backgroundColor='pink'/>
          </Animated.View>

           <View style={[styles.peopleGroup, {height: "70%", width: "20%", left: '70%', top: "20%"}]}>
             <People/>
          </View>

           <View style={[styles.peopleGroup, {height: "52%", width: "15%", left: '23%', top: "20%"}]}>
             <People/>
          </View>

          <View style={[styles.peopleGroup, {height: "52%", width: "15%", left: '18%', top: "30%"}]}>
             <People/>
          </View>

          <View style={[styles.peopleGroup, {height: "70%", width: "20%", left: '10%', top: "30%"}]}>
             <People/>
          </View>

           <View style={[styles.peopleGroup, {height: "52%", width: "15%", left: '54%', top: "30%"}]}>
             <People/>
          </View>
     
        </TouchableOpacity >


        <TouchableOpacity style = {styles.friendsButton} onPress={() => {navigation.navigate('Home')}}>
           <View>
              <Icon
                name='users'
                type='font-awesome'
                color='white'
                size={50}
                opacity={0.3}
              />
            </View>
         </TouchableOpacity>

      </View>
    );
   }


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },

  peopleGroup: {
    backgroundColor: 'transparent', 
    height: "45%", 
    width: "13%", 
    left: '40%', 
    top: "30%", 
    position: 'absolute'
  },

  touchPeopleGroup: {
    backgroundColor: 'transparent', 
    height: '17%', 
    top: '35%', 
    width: '80%', 
    left: '10%'
  },

  logo: {
    backgroundColor: 'transparent', 
    height: "20%", 
    width: '30%', 
    left: 150, 
    top: 50,
    position: 'absolute'
  },

  friendsButton: {
    bottom: '10%',
    right: 20,
    position: 'absolute',
   },

});

