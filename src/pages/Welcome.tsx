import React from 'react'
import { 
   Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions 
} from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import watering from './../assets/watering.png';

export function Welcome(){
   const navigation = useNavigation();

   function handleStart(){
      navigation.navigate('UserIdentification');
   }

   return (
      <SafeAreaView style={style.container}>
         <Text style={style.title}>
            Gerencie {'\n'} suas plantas de {'\n'} forma facil
         </Text>
         <Image source={watering} style={style.image} resizeMode="contain"/>
         <Text style={style.subtitle}>
            Não esqueça mais de regar suas plantas. 
            Nós cuidamos de lembrar você sempre que precisar.   
         </Text>
         <TouchableOpacity 
            style={style.button} 
            activeOpacity={0.6}
            onPress={handleStart}
         >
            <Icon name='angle-right' style={style.buttonIcon}/>
         </TouchableOpacity>
      </SafeAreaView>
   );
};

const style = StyleSheet.create({
   container : {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
   },
   title: {
      fontSize: 28,
      lineHeight: 34,
      textAlign: 'center',
      color: colors.heading,
      marginTop: 38,
      fontFamily: fonts.heading,
   },
   subtitle: {
      textAlign: 'center',
      fontSize: 18,
      paddingHorizontal: 40,
      color: colors.heading,
      fontFamily: fonts.text,
   },
   button: {
      backgroundColor: colors.green,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      marginBottom: 10,
      height: 56,
      width: 56
   },
   image: {
      height: Dimensions.get('window').width * .7,
   },
   buttonIcon: {
      fontSize: 32,
      color: colors.white,
   },
});