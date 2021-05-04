import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {SvgFromUri} from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantsProps extends RectButtonProps{
   data : {
      name: string;
      photo: string;
      hour: string;
   };
   handleRemove: () => void;
}

export const PlantCardSecondary = ({data,handleRemove, ...rest} : PlantsProps) => {
   return (
      <Swipeable 
         overshootRight={false} //Não vai ter lado direito
         renderRightActions={() => (
            <Animated.View>
               <View>
                  <RectButton style={styles.buttonRemove} onPress={handleRemove}>
                     <Feather name="trash" size={32} color={colors.white}/>
                  </RectButton>
               </View>
            </Animated.View>
         )} //Ação ao deslizar
      >
         <RectButton style={styles.container} {...rest}>
            <SvgFromUri uri={data.photo} width={50} height={50} />
            <Text style={styles.title}>
               {data.name}
            </Text>
            <View style={styles.details}>
               <Text style={styles.timeLabel}>Regar ás</Text>
               <Text style={styles.time}>{data.hour}</Text>
            </View>
         </RectButton>
      </Swipeable>
   );
}
const styles = StyleSheet.create({
   container: {
     width: '100%',
     paddingHorizontal: 10,
     paddingVertical: 20,
     borderRadius: 20,
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: colors.shape,
     marginVertical: 5,
   }, 
   title: {
      color: colors.heading,
      fontFamily: fonts.heading,
      flex: 1,
      fontSize: 17,
      marginLeft: 10,      
   },
   details: {
      alignItems: 'flex-end',
   },
   timeLabel: {
      marginTop: 5,
      fontSize: 16,
      fontFamily: fonts.text,
      color: colors.body_light,
      
   },
   time: {
      marginTop: 5,
      fontSize: 16,
      fontFamily: fonts.heading,
      color: colors.body_dark
   },
   buttonRemove: {
      width: 100,
      height: 90,
      backgroundColor: colors.red,
      marginTop: 10,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      right: 15,
      paddingLeft: 10,
   }
})