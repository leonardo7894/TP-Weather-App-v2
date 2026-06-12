import { renderHook, waitFor } from "@testing-library/react-native";
import useClima from "../useClima";

// va FUERA del test
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

test("muestra la ciudad correctamente", async () => {
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

  const result = renderHook(() => useClima());

  await waitFor(() => {
    expect(result).toBe("Luis J. Garcia");
  });
});
