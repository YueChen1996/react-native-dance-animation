import React, {useState, useRef} from 'react';
import { 
  TouchableOpacity,  
  View, 
  StyleSheet, 
  Image,
  Animated,
  PanResponder,
  Text,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon } from 'react-native-elements';


function GetFood ({navigation}){

  const [foodImage, setFoodImage] = useState(require('../images/start.png'));
  const [foodData, setFoodData] = useState();
  const [userList, setUserList] = useState();
  const [userId, setUserId] = useState();
  const [isDisable, setIsDisable] = useState(true);
  const [rating, setRating] = useState('unknown');
  const [isRated, setIsRated] = useState(false);
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
        x = Number(JSON.stringify(pan.x));
        y = Number(JSON.stringify(pan.y));
        (x > 0 ) ? setRating('like') : setRating('dislike');
        (Math.abs(x) < Math.abs(y)) ? setRating('unknown') : null;
        setIsRated(true);
      }, 
    })
  ).current;

  const foodEmojis = {
    grape: '🍇',
    melon: '🍈',
    watermelon: '🍉',
    tangerine: '🍊',
    lemon: '🍋',
    banana: '🍌',
    pineapple: '🍍',
    'red apple': '🍎',
    'green apple': '🍏',
    pear: '🍐',
    peach: '🍑',
    cherries: '🍒',
    strawberry: '🍓',
    kiwifruit: '🥝',
    tomato: '🍅',
    avocado: '🥑',
    eggplant: '🍆',
    potato: '🥔',
    carrot: '🥕',
    corn: '🌽',
    'hot pepper': '🌶',
    cucumber: '🥒',
    mushroom: '🍄',
    peanuts: '🥜',
    chestnut: '🌰',
    bread: '🍞',
    croissant: '🥐',
    'french bread': '🥖',
    pancakes: '🥞',
    cheese: '🧀',
    beef: '🍖',
    chicken: '🍗',
    bacon: '🥓',
    hamburger: '🍔',
    'french fries': '🍟',
    pizza: '🍕',
    hotdog: '🌭',
    taco: '🌮',
    burrito: '🌯',
    popcorn: '🍿',
    'rice crackers': '🍘',
    rice: '🍚',
    spaghetti: '🍝',
    'fried shrimp': '🍤',
    'ice cream': '🍨',
    doughnut: '🍩',
    cookie: '🍪',
    cake: '🍰',
    'chocolate bar': '🍫',
    candy: '🍬',
    'custard flan': '🍮',
    honey: '🍯',
    milk: '🥛',
    'black tea': '🍵',
    sake: '🍶',
    champagne: '🍾',
    'red wine': '🍷',
    beer: '🍺',
  };
  
  const getAllUsers = () => {
    fetch('http://localhost:3000/allUsers', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        var user = data.map(
          function (item) { 
            return item.name 
          })
        setUserList(user);
      })
      .catch(err => console.log(err));
  }
   
  const onSelect = (idx, value) => {
    setUserId(idx+1);
    getNextFood(idx+1);
    setIsDisable(false);
  }

  const getNextFood = (userId) => {
    // Fetch next movie from the server
    setIsRated(false);
    fetch(`http://localhost:3000/nextFood/${userId}`, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data)=> {
        if (data.length === 0){
          setFoodImage(require('../images/finish.png'));
          setIsDisable(true);
        }
        else{
          //console.log(data);
          setFoodData(data);
        }
      
      })
      .catch(err => console.log(err));

  };

  //console.log(foodData);

  const rateFood = (rating) => {
    console.log('rate food: ', userId, foodData[0].name, rating);
    // console.log(foodEmojis[foodData[0].name]);
    fetch('http://localhost:3000/rateFood', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        foodId: foodData[0].id,
        action: rating,
      }),
    });
    getNextFood(userId);
  }
  
  (isRated) ? rateFood(rating) : null;

  return (
    <View style={styles.container}>
    {userList !== undefined ? 
      <ModalDropdown style={styles.userMenu} options={userList} onSelect={(idx, value) => onSelect(idx, value)}/> :
     getAllUsers()}  

    { (isDisable) ? <Image style={styles.foodImage} source={foodImage}/> : null}

    <Animated.View
        style={[styles.moviePoster, {
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }]}
        {...panResponder.panHandlers}
        >
         { (!isDisable && foodData !== undefined) ? <Text style={{fontSize: 120}}> {foodEmojis[foodData[0].name]} </Text> : null}
    </Animated.View>

   
     
    <TouchableOpacity disabled = {isDisable} style = {styles.questionButton} onPress={() => rateFood('unknown')}>
       <View>
        <Icon
          name='question'
          type='font-awesome'
          color='white'
          size={60}
        />
      </View>
    </TouchableOpacity>
    <TouchableOpacity disabled = {isDisable} style = {styles.dislikeButton} onPress={() => rateFood('dislike')} >
       <View>
        <Icon
          name='thumbs-down'
          type='font-awesome'
          color='white'
          size={50}
        />
      </View>
    </TouchableOpacity>
    <TouchableOpacity disabled = {isDisable} style = {styles.likeButton} onPress={() => rateFood('like')}>
       <View>
        <Icon
          name='thumbs-up'
          type='font-awesome'
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
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
  },

  userMenu: {
    backgroundColor: 'yellow',
    top: 70,
    position: 'absolute',
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  foodImage: {
    height: '70%',
    bottom: 15,
    width: '90%',
    alignItems: 'center', 
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

   questionButton: {
    bottom: '7%',
    alignItems: 'center', 
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
  },

  likeButton: {
    bottom: '7%',
    right: 20,
    position: 'absolute',
   },

  dislikeButton: {
    bottom: '7%',
    left: 20,
    position: 'absolute',
   },

});

export default GetFood;
