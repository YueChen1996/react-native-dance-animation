import React, {useState, useRef} from 'react';
import { 
  TouchableOpacity,  
  View, 
  StyleSheet, 
  Image,
  Animated,
  PanResponder,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon} from 'react-native-elements';


function GetMovie ({navigation}){

  const [moviePoster, setMoviePoster] = useState();
  const [welcomeImage, setWelcomeImage] = useState(require('../images/start.png'));
  const [movieData, setMovieData] = useState();
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
  };
   
  const onSelect = (idx, value) => {
    setUserId(idx+1);
    getNextMovie(idx+1);
    setIsDisable(false);
  };
  

  const getNextMovie = (userId) => {
    // Fetch next movie from the server
    setIsRated(false);
    fetch(`http://localhost:3000/nextMovie/${userId}`, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data)=> {
        if (data.length === 0){
          setWelcomeImage(require('../images/finish.png'));
          setIsDisable(true);
        }
        else{
          setMoviePoster({uri: data[0].poster});
          setMovieData(data);
        }
      
      })
      .catch(err => console.log(err));
  };

  const rateMovie = (rating) => {
    console.log('rate movie: ', userId, movieData[0].original_title, rating);
    //console.log(movieData);
    setIsRated(true);
    fetch('http://localhost:3000/rateMovie', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        movieId: movieData[0].imdb_title_id,
        action: rating,
      }),
    });

    getNextMovie(userId);

  };
  

 (isRated) ? rateMovie(rating) : null;

 
    return (
      <View style={styles.container}>
      {userList !== undefined ? 
        <ModalDropdown style={styles.userMenu} options={userList} onSelect={(idx, value) => onSelect(idx, value)}/> :
       getAllUsers()}  

      { (isDisable) ? <Image style={styles.movieStart} source={welcomeImage}/> : null}

      <Animated.View
        style={[styles.moviePoster, {
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }]}
        {...panResponder.panHandlers}
        >
        { (!isDisable && movieData !== undefined) ? <Image style={styles.moviePoster} source={moviePoster}/> : null }
      </Animated.View>
     {/* <Image style={styles.moviePoster} source={moviePoster}/>*/}
      <TouchableOpacity disabled = {isDisable} style = {styles.questionButton} onPress={() => rateMovie('unknown')}>
         <View>
          <Icon
            name='question'
            type='font-awesome'
            color='white'
            size={60}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity disabled = {isDisable} style = {styles.dislikeButton} onPress={() => rateMovie('dislike')} >
         <View>
          <Icon
            name='thumbs-down'
            type='font-awesome'
            color='white'
            size={50}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity disabled = {isDisable} style = {styles.likeButton} onPress={() => rateMovie('like')}>
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

   movieStart: {
    height: '60%',
    top: 300,
    width: '90%',
    alignItems: 'center', 
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  moviePoster: {
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

export default GetMovie;
