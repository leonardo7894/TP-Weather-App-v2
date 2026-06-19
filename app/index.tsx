import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { SunIcon, Thermometer, Wind, Droplet } from "lucide-react-native";
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
      {!clima ? (
        <Text style={{ color: "black", fontWeight: "bold" }}>Cargando</Text>
      ) : (
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center p-4">
            <View className="w-full flex-row justify-between">
              <Button variant={"link"} onPress={() => setDiaSeleccionado(1)}>
                <Text style={{ color: "black" }}>{fechaAyer}</Text>
              </Button>
              <Button variant={"link"} onPress={() => setDiaSeleccionado(0)}>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {fechaHoy}
                </Text>
              </Button>
              <Button variant={"link"} onPress={() => setDiaSeleccionado(2)}>
                <Text style={{ color: "black" }}>{fechaMañana}</Text>
              </Button>
            </View>

            <Text style={{ color: "black" }} className="m-4 text-4xl">
              {clima.ciudad}
            </Text>
            <Icon as={SunIcon} size={150} color="black" />
          </View>
          <View style={{ paddingStart: 30, paddingVertical: 40, paddingBottom: 20}}>
            <Text style={{ color: "black", fontWeight: "bold" }}>
              <Icon as={Thermometer} size={18} color="black" />
              {climaActual?.day.avgtemp_c}°C
            </Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>
              <Icon as={Droplet} size={18} color="black" />
              {climaActual?.day.avghumidity}%
            </Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>
              <Icon as={Wind} size={18} color="black" />
              {climaActual?.day.maxwind_kph} km/h
            </Text>
          </View>
          <View
            className="w-full flex-row justify-between"
            style={{ paddingHorizontal: 20, paddingBottom: 20,  }}
          >
            <Text style={{ color: "black", fontSize: 48, padding:20 }}>
              {climaActual?.day.maxtemp_c}°
            </Text>
            <Text style={{ color: "black", fontSize: 48, fontWeight: "bold",padding:20 }}>
              {climaActual?.day.avgtemp_c}°
            </Text>
            <Text style={{ color: "black", fontSize: 48, padding:20 }}>
              {climaActual?.day.mintemp_c}°
            </Text>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
