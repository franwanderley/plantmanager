import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UseIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSave } from '../pages/PlantSave';

import AuthRoutes from './tab.routes';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StackRoutes = createStackNavigator();

async function isRegistered() {
   const name = await AsyncStorage.getItem('@plantmanager:user');
   return (name ? true : false);
}

const AppRoutes : React.FC = () => {
   const [isRegistred, setIsRegistred] = useState<Boolean>();

   useEffect(() => {
      async function isRegistered() {
         const name = await AsyncStorage.getItem('@plantmanager:user');
         setIsRegistred(name ? true : false);
      } 
      isRegistered();
   },[])
   if(isRegistred){
      return (
         <StackRoutes.Navigator
            headerMode= "none"
            screenOptions={{
               cardStyle: { backgroundColor: colors.white }
            }}
         >
            <StackRoutes.Screen
               name="PlantSelect"
               component={AuthRoutes}
            />
            <StackRoutes.Screen
               name="Confirmation"
               component={Confirmation}
            />
            <StackRoutes.Screen
               name="PlantSave"
               component={PlantSave}
            />
            <StackRoutes.Screen
               name="MyPlants"
               component={AuthRoutes}
            />
         </StackRoutes.Navigator>
      )
   }
   return (
      <StackRoutes.Navigator
         headerMode= "none"
         screenOptions={{
            cardStyle: { backgroundColor: colors.white }
         }}
      >
         <StackRoutes.Screen
            name="Welcome"
            component={Welcome}
         />
         <StackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
         />
         <StackRoutes.Screen
            name="Confirmation"
            component={Confirmation}
         />
         <StackRoutes.Screen
            name="PlantSelect"
            component={AuthRoutes}
         />
         <StackRoutes.Screen
            name="PlantSave"
            component={PlantSave}
         />
         <StackRoutes.Screen
            name="MyPlants"
            component={AuthRoutes}
         />
      </StackRoutes.Navigator>
   )
}
export default AppRoutes;