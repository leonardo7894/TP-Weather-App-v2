import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { SunIcon } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useClima from '../src/hooks/useClima';

export default function Screen() {
  const { clima, fechaHoy, fechaAyer, fechaMañana, climaActual, setDiaSeleccionado, } = useClima();

  
  return (
    <>
      <Stack.Screen />

{!clima ? <Text>Cargando</Text>: <SafeAreaView className="flex-1">
        <View className="flex-1 items-center p-4">
          <View className="w-full flex-row justify-between">
            <Button onPress={() => setDiaSeleccionado(1)}>
              <Text>{fechaAyer}</Text>
            </Button>
            <Button onPress={() => setDiaSeleccionado(0)}>
              <Text>{fechaHoy}</Text>
            </Button>
            <Button onPress={() => setDiaSeleccionado(2)}>
              <Text>{fechaMañana}</Text>
            </Button >
          </View>

          <Text className="m-4 text-6xl">{clima.ciudad}</Text>
          <Icon as={SunIcon} size={100} />
        </View>
        <View className="color-red-800 " >
          <Text>{climaActual?.day.avgtemp_c}°C</Text>
          <Text>{climaActual?.day.avghumidity}%</Text>
          <Text>{climaActual?.day.maxwind_kph} km/h</Text>
        </View>
      </SafeAreaView>}
      
    </>
  );
}
