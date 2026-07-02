import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import {
  SunIcon,
  Thermometer,
  Wind,
  Droplet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";

import { View, ImageBackground } from "react-native";
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

  if (!clima) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#E8EDF3]">
        <Text className="font-bold text-black">
          Cargando...
        </Text>
      </SafeAreaView>
    );
  }
return (
  <ImageBackground
    source={require("../assets/images/fondocielo.png")}
    resizeMode="cover"
    className="flex-1"
  >
    <SafeAreaView className="flex-1">

      {/* =======================================================
                      CONTENEDOR PRINCIPAL
      ======================================================= */}

      <View className="flex-1 items-center justify-center p-5">

        {/* =======================================================
                            TARJETA
        ======================================================= */}

        <View
        className="w-[88%] h-[80%] max-w-[420px] rounded-[30px]  px-6 py-6"
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 20,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            elevation: 8,
          }}
        >

          {/* =======================================================
                              HEADER
          ======================================================= */}

          <View className="flex-row items-center justify-between">

            {/* Día anterior */}

            <Button
              variant="link"
              onPress={() => setDiaSeleccionado(1)}
            >
              <View className="flex-row items-center">

                <Icon
                  as={ChevronLeft}
                  size={18}
                  color="black"
                />

                <Text className="ml-1 text-black">
                  {fechaAyer}
                </Text>

              </View>
            </Button>

            {/* Día actual */}

            <Button
              variant="link"
              onPress={() => setDiaSeleccionado(0)}
            >
              <Text className="text-[18px] font-bold text-black">
                {fechaHoy}
              </Text>
            </Button>

            {/* Día siguiente */}

            <Button
              variant="link"

              onPress={() => setDiaSeleccionado(2)}
            >
              <View className="flex-row items-center">

                <Text className="mr-1 text-black">
                  {fechaMañana}
                </Text>

                <Icon
                  as={ChevronRight}
                  size={18}
                  color="black"
                />

              </View>
            </Button>

          </View>

          {/* =======================================================
                        CIUDAD
======================================================= */}

<View className="items-center mt-8 w-full">

  <Text
    numberOfLines={1}
    adjustsFontSizeToFit
    minimumFontScale={0.85}
    className="w-full text-center font-bold text-black"
    style={{
      fontSize: 34,
      letterSpacing: 1.5,
    }}
  >
    {clima.ciudad.toUpperCase()}
  </Text>

</View>

          {/* =======================================================
                          ICONO DEL CLIMA
          ======================================================= */}

          <View className="items-center mt-8">

            <Icon
              as={SunIcon}
              size={185}
              color="black"
            />

          </View>

          {/* =======================================================
                          DATOS DEL CLIMA
          ======================================================= */}

          <View className="items-center mt-8">

            <View className="w-[180px]">

              {/* Humedad */}

              <View className="flex-row items-center mb-5">

                <Icon
                  as={Droplet}
                  size={28}
                  color="black"
                />

                <Text className="ml-4 text-lg font-bold text-black">
                  {climaActual?.day.avghumidity}%
                </Text>

              </View>

              {/* Presión */}

              <View className="flex-row items-center mb-5">

                <Icon
                  as={Thermometer}
                  size={24}
                  color="black"
                />

                <Text className="ml-4 text-lg font-bold text-black">
                  {clima.presionATM} hPa
                </Text>

              </View>

              {/* Viento */}

              <View className="flex-row items-center">

                <Icon
                  as={Wind}
                  size={24}
                  color="black"
                />

                <Text className="ml-4 text-lg font-bold text-black">
                  {climaActual?.day.maxwind_kph} km/h
                </Text>

              </View>

            </View>

          </View>

                    {/* =======================================================
                          TEMPERATURAS
          ======================================================= */}

          <View className="flex-1 justify-end pb-2">

            <View className="flex-row items-end justify-between">

              {/* Temperatura máxima */}

              <View className="items-center">

                <Text className="text-[30px] text-black">
                  {climaActual?.day.maxtemp_c}°
                </Text>

                <Text className="mt-1 text-xs text-gray-400">
                  MAX
                </Text>

              </View>

              {/* Temperatura actual */}

              <View className="items-center">

                <Text className="text-[70px] font-bold text-black leading-none">
                  {climaActual?.day.avgtemp_c}°
                </Text>

                <Text
                  className="text-xs text-gray-500"
                  style={{
                    letterSpacing: 3,
                    marginTop: -6,
                  }}
                >
                  NOW
                </Text>

              </View>

              {/* Temperatura mínima */}

              <View className="items-center">

                <Text className="text-[30px] text-black">
                  {climaActual?.day.mintemp_c}°
                </Text>

                <Text className="mt-1 text-xs text-gray-400">
                  MIN
                </Text>

              </View>

            </View>

          </View>

        </View>

      </View>

    
        </SafeAreaView>

  </ImageBackground>
);
}