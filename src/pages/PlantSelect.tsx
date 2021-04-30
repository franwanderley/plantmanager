import React, { useEffect, useState } from 'react';
import {
   FlatList, //Para Lista ReactNative
   StyleSheet,
   Text,
   View,
   ActivityIndicator
} from 'react-native';

import api from '../services/api';
import { Load } from '../components/Load';
import { EnviromentButton } from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnviromentProps {
   key: string;
   title: string;
}

export function PlantSelect(){
   const navigate = useNavigation();
   const [enviroment,setEnviroment] = useState<EnviromentProps[]>([]);
   const [enviromentSelected,setEnviromentSelected] = useState('all');
   const [plants,setPlants] = useState<PlantProps[]>([]);
   const [filteredPlants,setFilteredPlants] = useState<PlantProps[]>([]);
   const [loading, setLoading] = useState(true);
   const [loadingMore, setLoadingMore] = useState(false);
   const [page, setPage] = useState(1);
   
   //Vai pegar as Plantas
   async function fetchPlants(){
      const {data} = await api
      .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

      if(!data)
         return setLoading(true);
      //Ao mudar a pagina vai add mais Plantas
      if(page > 1){
         setPlants(oldValue => [...oldValue, ...data]);
         setFilteredPlants(oldValue => [...oldValue, ...data]);
      }
      else{
         setPlants(data);
         setFilteredPlants(data);
      }
      setLoading(false);
      setLoadingMore(false);
   }

   //Assim que o usuario chegar no final irá carregar mais plantas
   function handleFetchMore(distance: number){
      if(distance < 1)
         return ;
      setLoadingMore(true);
      setPage(oldValue => oldValue + 1);
      fetchPlants();

   }

   //Vai pegar os ambientes para colocar a planta
   useEffect(() => {
      async function fetchEnviroment(){
         await api.get('plants_environments?_sort=title&_order=asc')
         .then(res => setEnviroment([
            {
               key: 'all',
               title: 'Todos'
            },
            ...(res.data)
         ]))
         .catch(error => console.log(error));
      }
      fetchEnviroment();
   }, []);
   //Vai pegar as Plantas
   useEffect(() => {
      fetchPlants();
   }, []);
   //Vai filtar as Plantas com o ambiente selecionado
   useEffect(() => {
      async function fetchPlantsFiltered(){
         if(enviromentSelected === 'all')
            return setFilteredPlants(plants);

         const filtered = plants.filter(plant => 
            plant.environments.includes(enviromentSelected)
         );
         setFilteredPlants(filtered);
      }
      fetchPlantsFiltered();
   }, [enviromentSelected]);

      if(loading)
         return <Load/>

      return (
         <View style={styles.container}>
            <View style={{paddingHorizontal: 30}} >
               <Header/>

               <Text style={styles.title} >Em qual ambiente</Text>
               <Text style={styles.subtitle} >Você quer colocar sua planta?</Text>
            </View>
            <View>
               <FlatList 
                  data={enviroment}
                  renderItem={({item}) => (
                     <EnviromentButton 
                        key={String(item.key)} 
                        title={item.title}
                        active={item.key === enviromentSelected}
                        onPress={() => setEnviromentSelected(item.key)}
                     />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.enviromentList}
               />
            </View>
            <View style={styles.plants}>
               <FlatList
                  data={filteredPlants}
                  renderItem={({item}) => (
                     <PlantCardPrimary 
                     key={String(item.id)} 
                     data={item}
                     onPress={() => navigate.navigate('PlantSave', {plant: item})}
                  />
                  )}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  // Ao chegar no fim da lista vai chamar a função handleFetchMore
                  onEndReachedThreshold={0.1}
                  onEndReached={({ distanceFromEnd }) => 
                     handleFetchMore(distanceFromEnd)
                  }
                  ListFooterComponent={
                     loadingMore ?
                        <ActivityIndicator color={colors.green} />
                     : <></>
                  }
               />
            </View>
         </View>
      ); 
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.background,
   },
   title: {
      fontSize: 17,
      color: colors.heading,
      fontFamily: fonts.heading,
      lineHeight: 20,
      marginTop: 15
   },
   subtitle: {
      fontFamily: fonts.text,
      fontSize: 17,
      lineHeight: 20,
      color: colors.heading,
   },
   enviromentList: {
      height: 40,
      justifyContent: 'center',
      paddingBottom: 5,
      marginLeft: 32,
      marginVertical: 32,
   },
   plants: {
      flex: 1,
      paddingHorizontal: 32,
      justifyContent: 'center',
   }
});