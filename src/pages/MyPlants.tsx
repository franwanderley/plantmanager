import React, { useEffect, useState } from 'react';
import {
   View, Text, StyleSheet, Image, Alert
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import {PlantProps, loadPlant, StoragePlantProps, deletePlant} from '../libs/storage';
import waterdrop from '../assets/waterdrop.png';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants(){
   const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
   const [loading, setLoading] = useState(true);
   const [nextWaterd, setNextWatered] = useState<string>();

   function handleRemove(plant : PlantProps){
      Alert.alert('Remover', `Desejar remover a ${plant.name}?`, [
         {
            text: 'Não 🙏',
            style: 'cancel',
         },
         {
            text: 'Sim 😔',
            onPress: async () => {
               try{
                  //Apagar Planta
                  await deletePlant(plant.id);
                  setMyPlants( oldValue => oldValue.filter(item => item.id !== plant.id) );
                  Alert.alert('Planta Apagado com Sucesso!');
               }catch(error){
                  console.log(error);
                  Alert.alert('Não foi possivel apagar sua Planta!');
               }
            }
         }
      ]);
   }

   //Pegar as plantas no AsyncStorage
   useEffect(() => {
      async function loadStorageData(){
         const plantStorage = await loadPlant();
         setMyPlants(plantStorage);
         setLoading(false);
      }
      loadStorageData();
   }, []);

   //Pegar o nextWaterd ao mudar myPlants
   useEffect(() => {
      if(!myPlants[0])
         return;
      const nextTime = formatDistance(
         new Date(myPlants[0]?.dateTimeNotification).getTime(),
         new Date().getTime(),
         {locale: pt}
      );
      setNextWatered(
         `Não de esqueça de regar a ${myPlants[0]?.name} á ${nextTime}`
      );
   }, [myPlants]);

   if(loading)
         return <Load/>

   return (
      <View style={styles.container}>
         <Header/>
         <View style={styles.spotlight}>
            <Image 
               source={waterdrop} 
               style={styles.spotlightImage}
            />
            <Text style={styles.spotlightText}>
               {nextWaterd}
            </Text>
         </View>
         <View style={styles.plants}>
            <Text style={styles.plantsTitle}>Próximas regadas</Text>
            <FlatList
               data={myPlants}
               keyExtractor={(item) => String(item.id)}
               renderItem={({item}) => (
                  <PlantCardSecondary handleRemove={() => handleRemove(item)} data={item}/>
               )}
               showsVerticalScrollIndicator={false}
            />

         </View>
      </View>
   );
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 30,
      paddingTop: 20,
      backgroundColor: colors.background,
   },
   spotlight: {
      marginTop: 20,
      backgroundColor: colors.blue_light,
      paddingHorizontal: 20,
      borderRadius: 20,
      height: 110,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   spotlightImage: {
      width: 60,
      height: 60,

   },
   spotlightText: {
      flex: 1,
      color: colors.blue,
      paddingHorizontal: 20,
      textAlign: 'center',
   },
   plants: {
      flex: 1,
      width: '100%',
   },
   plantsTitle: {
      fontSize: 24,
      fontFamily: fonts.heading,
      color: colors.heading,
      marginVertical: 20,
      
   } 

})