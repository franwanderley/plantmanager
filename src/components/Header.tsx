import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header(){
   const [username, setUsername] = useState<string>();

   useEffect(() => {
      async function getUsername(){
         const name = await AsyncStorage.getItem('@plantmanager:user');
         setUsername(name || '');
      }
      getUsername();
   }, []);

   return (
      <View style={styles.container}>
         <View>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.username}>{username}</Text>
         </View>
         <Image source={{ uri: 'https://github.com/franwanderley.png' }} style={styles.image}/>
      </View>
   );
}
const styles = StyleSheet.create({
   container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: getStatusBarHeight(),
   },
   greeting: {
      fontSize: 32,
      color: colors.heading,
      fontFamily: fonts.text,
   },
   username: {
      fontSize: 32,
      fontFamily: fonts.heading,
      color: colors.heading,
      lineHeight: 40,
   },
   image: {
      width: 75,
      height: 75,
      borderRadius: 35, //sempre a metade do width
   },
});