import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Link, Stack } from "expo-router";
import { SunIcon } from "lucide-react-native";
import * as React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useClima from "../src/hooks/useClima";

export default function Screen() {
  const {
    clima,
    fechaHoy,
    fechaAyer,
    fechaMañana,
    climaActual,
    setDiaSeleccionado,
  } = useClima();

  return (
    <>

{!clima ? <Text>Cargando</Text>: 
      <SafeAreaView className="flex-1" >
        <View className="flex-1 items-center p-4" >
          <View className="w-full flex-row justify-between">
            <Button variant={"link"} onPress={() => setDiaSeleccionado(1)}>
              <Text style={{color: "black"}}>{fechaAyer}</Text>
            </Button>
            <Button  variant={"link"} onPress={() => setDiaSeleccionado(0)}>
              <Text style={{color: "black"}}>{fechaHoy}</Text>
            </Button>
            <Button variant={"link"} onPress={() => setDiaSeleccionado(2)}>
              <Text style={{color: "black"}}>{fechaMañana}</Text>
            </Button >
          </View>

          <Text style={{color: "black"}} className="m-4 text-6xl">{clima.ciudad}</Text>
          <Icon as={SunIcon} size={100} color= "black"/>
        </View>
        <View>
          <Text style={{color: "black"}}>{climaActual?.day.avgtemp_c}°C</Text>
          <Text style={{color: "black"}}>{climaActual?.day.avghumidity}%</Text>
          <Text style={{color: "black"}}>{climaActual?.day.maxwind_kph} km/h</Text>
        </View>
      </SafeAreaView>}
      
    </>
  );
}
