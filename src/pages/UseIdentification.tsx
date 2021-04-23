import React, { useState } from 'react';
import {
   SafeAreaView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){

   const [isFocused, setIsFocused] = useState(false);
   const [name, setName] = useState<String>();

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
            <View style={styles.form}>
               <View style={styles.header}>
                  <Text style={styles.emoji}> { !!name ? '😄' : '😀'} </Text>
                  <Text style={styles.title}>
                     Como podemos {'\n'} chamar você?
                  </Text>
               </View>
               <TextInput 
                  style={[
                     styles.input,
                     (isFocused || !!name) && { borderColor: colors.green } 
                  ]} 
                  placeholder="Digite um nome"
                  onBlur={ () => setIsFocused(false) }
                  onFocus={ () => setIsFocused(true) }
                  onChangeText={ (value) => setName(value) }
               />
               <View style={styles.footer}>
                  <Button/>
               </View>
            </View>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',

   },
   form: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      paddingHorizontal: 54,
      alignItems: 'center',

   },
   emoji: {
      fontSize: 44,
   },
   title: {
      fontSize: 24,
      lineHeight: 32,
      fontFamily: fonts.heading,
      marginTop: 20,
      textAlign: 'center',
      color: colors.heading,
   },
   header: {
      alignItems: 'center',
   },
   input: {
      borderBottomWidth: 1,
      borderColor: colors.gray,
      color: colors.heading,
      width: '100%',
      fontSize: 18,
      marginTop: 40,
      padding: 10,
      textAlign: 'center',
   },
   footer: {
      marginTop: 40,
      width: '100%',
      paddingHorizontal: 20,
   },
});