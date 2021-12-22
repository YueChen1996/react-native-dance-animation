import React, {useState, useRef} from 'react';
import { 
  TouchableOpacity,  
  View, 
  Text, 
  StyleSheet, 
  NativeModules,
  Animated
} from 'react-native';

import { Icon } from 'react-native-elements';
import PeopleWithShadow from "./PeopleWithShadow";


export default function Home ({navigation}) {
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const top = useRef(new Animated.Value(100)).current;
  const width = useRef(new Animated.Value(150)).current;
  const height = useRef(new Animated.Value(200)).current;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    
    setModalVisible(!isModalVisible);

    (!isModalVisible) ?

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(top, {
        toValue: 400,
        duration: 500
      }),
      Animated.timing(width, {
        toValue: 250,
        duration: 500
      }),
      Animated.timing(height, {
        toValue: 350,
        duration: 500
      })
    ], { useNativeDriver: false }).start() :
  
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500
      }),
      Animated.timing(top, {
        toValue: 50,
        duration: 500
      }),
      Animated.timing(width, {
        toValue: 150,
        duration: 500
      }),
      Animated.timing(height, {
        toValue: 200,
        duration: 500
      })
    ], { useNativeDriver: false }).start()
  };

  return (
    <View style={styles.container}>

    <Animated.View style={[styles.modalView, {opacity: fadeAnim}]}>
      <TouchableOpacity style = {styles.filmButton} onPress={() => navigation.navigate("Movie")}>
        <View>
          <Icon
            name='film'
            type='font-awesome'
            color='white'
            size={60}       
          />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style = {styles.cdButton} onPress={() => navigation.navigate("Music")}>
        <View>
          <Icon
            name='music'
            type='font-awesome'
            color='white'
            size={60}             
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.foodButton} onPress={() => navigation.navigate("Food")}>
        <View>
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='white'
            size={60}
          />
        </View>
      </TouchableOpacity>
    </Animated.View> 

    {(!isModalVisible) ? <View style={styles.paragraph} > 
      <Text style={styles.paragraphText}>You are here. </Text>
      <Text style={styles.paragraphTextShadow}>You are here. </Text>
      <Text style={styles.paragraphText}>There are others. </Text>
      <Text style={styles.paragraphTextShadow}>There are others.</Text>
      <Text style={styles.paragraphText}>It is time to find them. </Text>
      <Text style={styles.paragraphTextShadow}>It is time to find them. </Text>
    </View> : null}

      
       
    <Animated.View style={[styles.logo, {top: top, width: width, height: height}]}>
      <TouchableOpacity style={styles.bouncePeople} onPress={toggleModal}>
            <PeopleWithShadow />
          </TouchableOpacity>
    </Animated.View>

    <TouchableOpacity style = {styles.friendsButton} onPress={() => {navigation.navigate('Friends')}}>
     <View>
        <Icon
          name='users'
          type='font-awesome'
          color='white'
          size={50}
        />
      </View>
     </TouchableOpacity>

     <TouchableOpacity style = {styles.mapButton} onPress={() => {navigation.navigate('Map')}}>
       <View>
        <Icon
          name='location-outline'
          type='ionicon'
          color='white'
          size={50}
        />
      </View>
     </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: 'black',
  },
  friendsButton: {
    bottom: '10%',
    right: 20,
    position: 'absolute',
   },

  mapButton: {
    bottom: '10%',
    left: 20,
    position: 'absolute',
   },

  logo: {
    width: '30%', 
    top: 150, 
    height: '20%', 
    backgroundColor: 'transparent'
   },

  bouncePeople: {  
    width: "100%",
    height: "100%", 
    backgroundColor:'transparent',
  },

  modalView: {
    backgroundColor: "transparent",
    padding: 25,
    alignItems: "center",
    width: "100%",
    height: "15%",
    top: "25%",
  },

  filmButton: {
    top: "30%",
    left: 10,
    position: 'absolute',
  },

  cdButton: {
    top: "30%",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  foodButton: {
    top: "30%",
    right: 10,
    position: 'absolute',
  },

  paragraph: {
    bottom: '25%',
    position: 'absolute',
  },

  paragraphText: {
    color: 'white', 
    fontSize: 20,
  },

  paragraphTextShadow: {
    color: 'grey', 
    fontSize: 20,
    opacity: 0.5,
    transform: [{rotateX:'180deg'}]
  }
});



