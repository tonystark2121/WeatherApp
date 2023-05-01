import React,{useState,useEffect} from 'react';
import { TextInput,Button,Card,Title} from 'react-native-paper';
import {View,Text,FlatList,Image} from 'react-native'
import Header from './Header'



const Home = (props)=>{
    const [info,setInfo] = useState({
        name:"loading !!",
        temp:"loading",
        humidity:"loading",
        desc:"loading",
        icon:"loading"
    })
    useEffect(()=>{
       getWeather()
    },[])

    const getWeather = async( ) => {
            let MyCity;
            const {city} = props.route.params
            MyCity = city
        const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&appid=9c74e1b1db429c43534ec3758be12f9b&units=metric`,
      );
      // .then(item=>item.json())
      // .then(cityData=> {
      //   setcities(cityData)
      // })
      const json = await res.json();
      setInfo({
        name:json.name,
        temp:json.main.temp,
        humidity:json.main.humidity,
        desc:json.weather[0].description,
        icon:json.weather[0].icon,
    })
     // console.log(json); 
    }

    if(props.route.params.city != "london"){
        getWeather()
    }

    
    return(
        <View style={{flex: 1}}>
             <Header name="Weather App" />
           <View style={{alignItems:"center"}}>
               <Title 
               style={{
                   color:'#00aaff',
                   marginTop:30,
                   fontSize:30
               }}>
                   {info.name}
               </Title>
               <Image 
               style={{
                   width:120,
                   height:120
               }}
               source={{uri:"https://openweathermap.org/img/w/"+info.icon+".png"}}
               
               />

           </View>

           <Card style={{
               margin:5,
               padding:12
           }}>
           <Title style={{color:"#00aaff"}}>Temperature - {info.temp}</Title>
           </Card>
           <Card style={{
               margin:5,
               padding:12
           }}>
           <Title style={{color:"#00aaff"}}>Humidity - {info.humidity}</Title>
           </Card>
           <Card style={{
               margin:5,
               padding:12
           }}>
           <Title style={{color:"#00aaff"}}>Description-  {info.desc}</Title>
           </Card>
        </View>
    )

}

export default Home