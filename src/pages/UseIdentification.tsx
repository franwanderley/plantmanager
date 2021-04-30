import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
   SafeAreaView,
   StyleSheet, 
   Text, 
   TextInput, 
   View, 
   KeyboardAvoidingView, //para não subir muito alto quando tiver o teclado
   TouchableWithoutFeedback, //Quando clicar na tela sumir o teclado
   Platform, //Definir qual a plataforma IOS | Android
   Keyboard, //Para controlar o teclado do Device
   Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
   const navigation = useNavigation();
   const [isFocused, setIsFocused] = useState(false);
   const [name, setName] = useState<string>();

   async function handleSubmit(){
      if(!name)
         return Alert.alert('Nome Obrigatorio! 😔');

      //Vai salvar o nome
      try{
         await AsyncStorage.setItem('@plantmanager:user', name);
      }catch{
         Alert.alert('Deu erro ao salvar no seu dispositivo! 😔');
      }
      navigation.navigate('Confirmation', {
         title: 'Prontinho',
         subtitle: 'Agora vamos cuidar das suas plantinhas com muito cuidado',
         buttonTitle: 'Começar',
         icon: '😄',
         nextScreen: 'PlantSelect',
      });
   }

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <View style={styles.form}>
                  <View style={styles.header}>
                     <Text style={styles.emoji}>
                        { (isFocused || !!name) ? '😄' : '😀'} 
                     </Text>
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
                     <Button text="Confirmar" onPress={handleSubmit}/>
                  </View>
               </View>
            </TouchableWithoutFeedback>
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