import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header(){
   return (
      <View style={styles.container}>
         <View>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.username}>Wanderley</Text>
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