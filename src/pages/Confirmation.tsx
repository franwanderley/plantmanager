import react from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation(){
   return (
      <SafeAreaView style={styles.container}>
         <Text style={styles.emoji}>😃</Text>
         <Text style={styles.title}>Prontinho!</Text>
         <Text style={styles.title}>
            Agora vamos cuidar da suas 
            plantinhas com muito cuidado.
         </Text>
         <View style={styles.footer}>
            <Button/>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
   },
   emoji: {

   },
   title: {
      fontSize: 22,
      fontFamily: fonts.heading,
      textAlign: 'center',
      color: colors.heading,
      lineHeight: 38,
      marginTop: 15,

   },
   subtitle: {

   },
   footer: {

   },
});