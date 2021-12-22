import React from 'react';
import { 
  TouchableOpacity,  
  View, 
  StyleSheet, 
  Image,
} from 'react-native';
import { Icon} from 'react-native-elements';



export default function GetMap ({navigation}){

    return (
      <View style={styles.container}>
      <Image source={{uri: 'https://assets.codepen.io/t-2179/heatmap1.png'}}
             style={styles.map} />
      <TouchableOpacity style = {styles.mapButton} onPress={() => {navigation.navigate('Home')}}>
         <View>
          <Icon
            name='location'
            type='ionicon'
            color='orange'
            size={60}
          />
        </View>
      </TouchableOpacity>
      </View>
    );
   }




const styles = StyleSheet.create({
  inputStyle: {
    padding: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },

  container: {
    flex: 1,
    alignItems: 'center', 
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  
  map: {
    flex: 1,
    alignItems: 'center', 
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
  },

   mapButton: {
    bottom: 50,
    right: 10,
    position: 'absolute',
  },

});

