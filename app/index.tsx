import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import {
  SunIcon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Thermometer,
  Wind,
  Droplet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";

import { View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useClima from "../src/hooks/useClima";

// Mapea el texto de condición (en español, viene de la API) a un ícono y un slug estable para el testID
function getWeatherIcon(conditionText?: string) {
  const text = (conditionText || "").toLowerCase();

  if (text.includes("tormenta")) return { IconComp: CloudLightning, slug: "stormy" };
  if (text.includes("nieve")) return { IconComp: CloudSnow, slug: "snowy" };
  if (text.includes("lluvia") || text.includes("llovizna")) return { IconComp: CloudRain, slug: "rainy" };
  if (text.includes("niebla") || text.includes("bruma")) return { IconComp: CloudFog, slug: "foggy" };
  if (text.includes("nublado") || text.includes("nube")) return { IconComp: Cloud, slug: "cloudy" };

  return { IconComp: SunIcon, slug: "sunny" };
}

export default function Screen() {
  const {
    clima,
    fechaHoy,
    fechaAyer,
    fechaMañana,
    climaActual,
    diaSeleccionado,     
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

  const { IconComp, slug } = getWeatherIcon(climaActual?.day.condition?.text);

  return (
    <ImageBackground
      source={require("../assets/images/fondocielo.png")}
      resizeMode="cover"
      className="flex-1"
      style={{ flex: 1, width: "100%", height: "100%" }}
      imageStyle={{ objectPosition: "center 35%" } as any}
    >
      <SafeAreaView className="flex-1" testID="screen-weather">

        {/* CONTENEDOR PRINCIPAL */}
        <View className="flex-1 items-center justify-center p-5">

          {/* TARJETA */}
          <View
            className="w-[88%] max-w-[420px] rounded-[30px] px-6 py-6"
            style={{
              maxHeight: "90%",
              backgroundColor: "rgba(255,255,255,0.95)",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 10 },
              elevation: 8,
            }}
          >
            {/* HEADER / NAVEGACIÓN */}
<View className="flex-row items-center justify-between">

  <Button
    variant="link"
    testID="button-prev-day"
    onPress={() => setDiaSeleccionado(1)}
  >
    <View className="flex-row items-center">
      <Icon as={ChevronLeft} size={18} color="black" />
      <Text
        className={
          diaSeleccionado === 1
            ? "ml-1 text-black font-bold underline"
            : "ml-1 text-black opacity-50"
        }
      >
        {fechaAyer}
      </Text>
    </View>
  </Button>

  <Button
    variant="link"
    onPress={() => setDiaSeleccionado(0)}
  >
    <Text
      testID="navigation-current-day"
      className={
        diaSeleccionado === 0
          ? "text-[18px] font-bold text-black underline"
          : "text-[18px] font-bold text-black opacity-50"
      }
    >
      {fechaHoy}
    </Text>
  </Button>

  <Button
    variant="link"
    testID="button-next-day"
    onPress={() => setDiaSeleccionado(2)}
  >
    <View className="flex-row items-center">
      <Text
        className={
          diaSeleccionado === 2
            ? "mr-1 text-black font-bold underline"
            : "mr-1 text-black opacity-50"
        }
      >
        {fechaMañana}
      </Text>
      <Icon as={ChevronRight} size={18} color="black" />
    </View>
  </Button>

</View>

            

            {/* CIUDAD */}
            <View className="items-center mt-6 w-full">
              <Text
                testID="header-city"
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                className="w-full text-center font-bold text-black"
                style={{ fontSize: 34, letterSpacing: 1.5 }}
              >
                {clima.ciudad.toUpperCase()}
              </Text>
            </View>

            {/* ICONO DEL CLIMA */}
            <View
              className="items-center mt-6"
              testID={`icon-weather-${slug}`}
              accessibilityRole="image"
            >
              <Icon as={IconComp} size={130} color="black" />
            </View>

            {/* DATOS DEL CLIMA (métricas secundarias) */}
            <View className="items-center mt-6">
              <View className="w-[180px]">

                {/* Humedad */}
                <View className="flex-row items-center mb-4" testID="metric-item">
                  <Icon as={Droplet} size={26} color="black" testID="metric-icon" />
                  <Text className="ml-4 text-lg font-bold text-black" testID="metric-value">
                    {`${climaActual?.day.avghumidity}%`}
                  </Text>
                </View>

                {/* Presión */}
                <View className="flex-row items-center mb-4" testID="metric-item">
                  <Icon as={Thermometer} size={22} color="black" testID="metric-icon" />
                  <Text className="ml-4 text-lg font-bold text-black" testID="metric-value">
                    {`${clima.presionATM} hPa`}
                  </Text>
                </View>

                {/* Viento */}
                <View className="flex-row items-center" testID="metric-item">
                  <Icon as={Wind} size={22} color="black" testID="metric-icon" />
                  <Text className="ml-4 text-lg font-bold text-black" testID="metric-value">
                    {`${climaActual?.day.maxwind_kph} km/h`}
                  </Text>
                </View>

              </View>
            </View>

            {/* TEMPERATURAS */}
            <View className="mt-6">
              <View className="flex-row items-end justify-between">

                <View className="items-center">
                  <Text className="text-[30px] text-black" testID="temp-max">
                    {`${climaActual?.day.maxtemp_c}°`}
                  </Text>
                  <Text className="mt-1 text-xs text-gray-400">MAX</Text>
                </View>

                <View className="items-center">
                  <Text className="text-[70px] font-bold text-black leading-none" testID="temp-current">
                    {`${climaActual?.day.avgtemp_c}°`}
                  </Text>
                  <Text className="text-xs text-gray-500" style={{ letterSpacing: 3, marginTop: -6 }}>
                    NOW
                  </Text>
                </View>

                <View className="items-center">
                  <Text className="text-[30px] text-black" testID="temp-min">
                    {`${climaActual?.day.mintemp_c}°`}
                  </Text>
                  <Text className="mt-1 text-xs text-gray-400">MIN</Text>
                </View>

              </View>
            </View>

          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}