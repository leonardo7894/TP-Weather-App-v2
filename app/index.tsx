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

  if (!clima) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#E8EDF3]">
        <Text style={{ color: "black", fontWeight: "bold" }}>
          Cargando...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#E8EDF3]">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 420,
            height: "100%",
            backgroundColor: "white",
            borderRadius: 30,
            paddingHorizontal: 25,
            paddingVertical: 30,
            justifyContent: "space-between",

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
          {/* ================= HEADER ================= */}

          <View className="w-full flex-row justify-between items-center">
            <Button variant="link" onPress={() => setDiaSeleccionado(1)}>
              <View className="flex-row items-center">
                <Icon as={ChevronLeft} size={18} color="black" />
                <Text style={{ color: "black", marginLeft: 4 }}>
                  {fechaAyer}
                </Text>
              </View>
            </Button>

            <Button variant="link" onPress={() => setDiaSeleccionado(0)}>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {fechaHoy}
              </Text>
            </Button>

            <Button variant="link" onPress={() => setDiaSeleccionado(2)}>
              <View className="flex-row items-center">
                <Text style={{ color: "black", marginRight: 4 }}>
                  {fechaMañana}
                </Text>

                <Icon as={ChevronRight} size={18} color="black" />
              </View>
            </Button>
          </View>

          {/* ================= CENTRO ================= */}

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingVertical: 15,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 28,
                fontWeight: "700",
                letterSpacing: 3,
                width: "100%",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {clima.ciudad.toUpperCase()}
            </Text>

            <Icon as={SunIcon} size={205} color="black" />

            <View
              style={{
                marginTop: 15,
                width: 140,
                alignSelf: "center",
              }}
            >
              <View
                className="flex-row items-center"
                style={{ marginBottom: 18 }}
              >
                <Icon as={Droplet} size={30} color="black" />

                <Text
                  style={{
                    color: "black",
                    marginLeft: 10,
                    fontWeight: "bold",
                  }}
                >
                  {climaActual?.day.avghumidity}%
                </Text>
              </View>

              <View
                className="flex-row items-center"
                style={{ marginBottom: 18 }}
              >
                <Icon as={Thermometer} size={18} color="black" />

                <Text
                  style={{
                    color: "black",
                    marginLeft: 10,
                    fontWeight: "bold",
                  }}
                >
                  {clima.presionATM} hPa
                </Text>
              </View>

              <View
                className="flex-row items-center"
                style={{ marginBottom: 18 }}
              >
                <Icon as={Wind} size={18} color="black" />

                <Text
                  style={{
                    color: "black",
                    marginLeft: 10,
                    fontWeight: "bold",
                  }}
                >
                  {climaActual?.day.maxwind_kph} km/h
                </Text>
              </View>
            </View>
          </View>

          {/* ================= TEMPERATURAS ================= */}

          <View
            className="w-full flex-row justify-between items-end"
            style={{
              marginTop: 50,
              paddingBottom: 30,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 34,
              }}
            >
              {climaActual?.day.maxtemp_c}°
            </Text>

            <View className="items-center">
              <Text
                style={{
                  color: "black",
                  fontSize: 58,
                  fontWeight: "bold",
                }}
              >
                {climaActual?.day.avgtemp_c}°
              </Text>

              <Text
                style={{
                  color: "#888",
                  fontSize: 11,
                  letterSpacing: 1,
                  marginTop: -5,
                }}
              >
                NOW
              </Text>
            </View>

            <Text
              style={{
                color: "black",
                fontSize: 44,
              }}
            >
              {climaActual?.day.mintemp_c}°
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}