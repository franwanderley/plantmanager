import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import * as Notifications from 'expo-notifications';
export interface PlantProps {
   id: number;
   name: string;
   about: string;
   water_tips: string;
   photo: string;
   environments: [string];
   frequency: {
      times: number;
      repeat_every: string;
   };
   hour: string;
   dateTimeNotification: Date;
}

export interface StoragePlantProps{
   [id: string]: {
      data: PlantProps;
      notificationsId: string;
   };
}

export async function savePlant(plant: PlantProps) : Promise<void> {
   try{
      //Para saber em quanto tempo vai aguar as plantas
      const nexTime = new Date(plant.dateTimeNotification);
      const now = new Date();
      const {times, repeat_every} = plant.frequency;
      if(repeat_every === 'week'){
         const interval = Math.trunc(7 / times);
         nexTime.setDate(now.getDate() + interval);
      }
      else
         nexTime.setDate(nexTime.getDate() +1);
      const seconds = Math.abs(
         Math.ceil((now.getTime() -  nexTime.getTime()) / 1000)
      );
      
      //Notificação
      const notificationsId = await Notifications.scheduleNotificationAsync({
         content: {
            title: 'Heey 🌱',
            body: `Está na hora de cuidar da sua ${plant.name}`,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            data: {
               plant
            },
         },
         trigger: {
            seconds: seconds < 60 ? 60 : seconds,
            repeats: true,
         },

      })

      const data = await AsyncStorage.getItem('@plantmanager:plants');
      const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};
      const newPlants = {
         [plant.id]: {
            data: plant,
            notificationsId
         }
      }
      await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify({
         ...newPlants,
         ...oldPlants
      }));
   }catch(error){
      throw new Error(error);
   }
}

export async function loadPlant() : Promise<PlantProps[]> {
   try{
      const data = await AsyncStorage.getItem('@plantmanager:plants');
      const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};
      console.log(plants);

      //Vai adiciona as horas formatadas e ordenadas pela data
      const plantSorted = Object
      .keys(plants).map(plant => {
         return {
            ...plants[plant].data,
            hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
         }
      }).sort((a,b) => Math.floor(
            new Date(a.dateTimeNotification).getTime() / 1000 -
            new Date(b.dateTimeNotification).getTime() / 1000
         )
      );
      return plantSorted; 
   }catch(error){
      throw new Error(error);
   }
}

export async function deletePlant(id : number) : Promise<void> {
   try{
      const data = await AsyncStorage.getItem('@plantmanager:plants');
      const plants = data ? JSON.parse(data) as StoragePlantProps : {};
      
      delete plants[id];
      await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));
      if(plants[id]?.notificationsId)
         await Notifications.cancelScheduledNotificationAsync(plants[id].notificationsId);
   }catch(error){
      throw new Error(error);
   }
}