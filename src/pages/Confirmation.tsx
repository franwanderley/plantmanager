import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
   SafeAreaView, StyleSheet, Text, View 
} from 'react-native';
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation(){
   const navigation = useNavigation();

   function handleMoveOn(){
      navigation.navigate('PlantSelect');
   }

   return (
      <SafeAreaView style={styles.container}>
         <Text style={styles.emoji}>😄</Text>
         <Text style={styles.title}>Prontinho</Text>
         <Text style={styles.title}>
            Agora vamos cuidar das suas 
            plantinhas com muito cuidado.
         </Text>
         <View style={styles.footer}>
            <Button text="Começar" onPress={handleMoveOn}/>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   emoji: {
      fontSize: 78,
   },
   title: {
      fontSize: 22,
      fontFamily: fonts.heading,
      textAlign: 'center',
      color: colors.heading,
      lineHeight: 38,
      marginTop: 30,

   },
   subtitle: {
      fontFamily: fonts.text,
      color: colors.heading,
      fontSize: 17,
      textAlign: 'center',
      paddingVertical: 10,
   },
   footer: {
      marginTop: 30,
      width: '100%',
      paddingHorizontal: 50,
   },
});