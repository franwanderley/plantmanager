import React from 'react';
import {
  useFonts, Jost_400Regular, Jost_600SemiBold
} from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular, Jost_600SemiBold
  });

  //Enquanto carregar as Font vai colocar o Splash
  if(!fontsLoaded)
    return <AppLoading />

  return (
    <Routes />
    );
}
