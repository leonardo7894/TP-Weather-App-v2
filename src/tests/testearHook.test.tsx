import { renderHook, waitFor } from "@testing-library/react-native";
import useClima from "@/src/hooks/useClima";

// 1. Dejamos los mocks tal cual los tenías
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" }),
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: { latitude: -34.6037, longitude: -58.3816 },
    }),
  ),
}));

beforeEach(() => {
  jest.clearAllMocks(); 

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          location: { name: "Luis J. Garcia" },
          current: {
            temp_c: 9.2,
            humidity: 93,
            wind_kph: 6.1,
            pressure_mb: 1027.0,
            condition: { text: "Despejado" },
          },
          forecast: { forecastday: [] },
        }),
    }),
  ) as jest.Mock;
});

test("muestra la ciudad correctamente", async () => {
  const { result } = await renderHook(() => useClima());

  // waitFor se encarga de re-intentar hasta que el estado asíncrono impacte
  await waitFor(() => {
    expect(result.current.clima?.ciudad).toBe("Luis J. Garcia");
  });
});

test("muestra la temperatura correctamente", async () => {
  const { result } = await renderHook(() => useClima());

  await waitFor(() => {
    expect(result.current.clima?.temperatura).toBe(9.2);
  });
});

test("muestra la humedad correctamente", async () => {
  const { result } = await renderHook(() => useClima());

  await waitFor(() => {
    expect(result.current.clima?.humedad).toBe(93);
  });
});

test("muestra la velocidad del viento correctamente", async () => {
  const { result } = await renderHook(() => useClima());

  await waitFor(() => {
    expect(result.current.clima?.velocidadViento).toBe(6.1);
  });
});

test("muestra la presión atmosférica correctamente", async () => {
  const { result } = await renderHook(() => useClima());

  await waitFor(() => {
    expect(result.current.clima?.presionATM).toBe(1027.0);
  });
});

test("muestra la condición correctamente", async () => {
  const { result } = await renderHook(() => useClima());

  await waitFor(() => {
    expect(result.current.clima?.condicion).toBe("Despejado");
  });
});
