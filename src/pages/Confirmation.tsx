import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
   SafeAreaView, StyleSheet, Text, View 
} from 'react-native';

import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params{
   title: string;
   subtitle: string;
   buttonTitle: string;
   icon: '😄' | '🤗';
   nextScreen: string;
}

export function Confirmation(){
   const navigation = useNavigation();
   const route = useRoute();
   const detailConfirmation = route.params as Params;

   return (
      <SafeAreaView style={styles.container}>
         <Text style={styles.emoji}>{detailConfirmation.icon}</Text>
         <Text style={styles.title}>{detailConfirmation.title}</Text>
         <Text style={styles.subtitle}>{detailConfirmation.subtitle}</Text>
         <View style={styles.footer}>
            <Button
               text={detailConfirmation.buttonTitle}
               onPress={() => navigation.navigate(detailConfirmation.nextScreen)}
            />
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
      paddingHorizontal: 30,
   },
   footer: {
      marginTop: 30,
      width: '100%',
      paddingHorizontal: 50,
   },
});