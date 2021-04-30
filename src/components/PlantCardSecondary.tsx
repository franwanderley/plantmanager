import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps} from 'react-native-gesture-handler';
import {SvgFromUri} from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantsProps extends RectButtonProps{
   data : {
      name: string;
      photo: string;
      hour: string;
   }
}

export const PlantCardSecondary = ({data, ...rest} : PlantsProps) => (
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
);

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
   }  
})