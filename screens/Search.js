import React, {useState} from 'react';
import { Button, Card, TextInput, Title} from 'react-native-paper';
import {View, Text, FlatList} from 'react-native';
import Header from './Header';



export default Search = ({navigation}) => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
 
  const fetcities = async text => {
    setCity(text);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=9c74e1b1db429c43534ec3758be12f9b&units=metric`,
      );
      // .then(item=>item.json())
      // .then(cityData=> {
      //   setcities(cityData)
      // })
      const json = await response.json();
      setCities([json]);
      //console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const btnClick = ()=>{
   // await AsyncStorage.setItem("newcity",city)
    navigation.navigate("home",{city:city})
}

const listClick =  (cityname)=>{
  setCity(cityname)
 // await AsyncStorage.setItem("newcity",cityname)
  navigation.navigate("home",{city:cityname})
}

  return (
    <View style={{flex: 1}}>
      <Header name="Search Screen" />
      <TextInput
        label="City name"
        theme={{colors: {primary: '#00aaff'}}}
        value={city}
        onChangeText={text => fetcities(text)}
      />
      <Button
        icon="content-save"
        mode="contained"
        theme={{colors: {primary: '#00aaff'}}}
        style={{margin: 20}}
        onPress={() => btnClick()}>
        <Text style={{color: 'white'}}>Save Changes</Text>
      </Button>
      <FlatList
        data={cities}
        renderItem={({item}) => {
          return (
            <Card 
            style={{margin:2,padding:12 , backgroundColor: 'grey'}}
            onPress={()=>listClick(item.name)}
           >
               <Text>{item.name}</Text>
           </Card>
          );
        }}
        keyExtractor={(item, ind) => ind}
      />
    </View>
  );
};
