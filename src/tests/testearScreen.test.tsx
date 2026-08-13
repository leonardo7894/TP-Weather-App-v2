import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import Screen from "../../app/index";

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
          location: { name: "Buenos Aires" },
          current: {
            temp_c: 20,
            humidity: 60,
            wind_kph: 10,
            pressure_mb: 1015,
            condition: { text: "Soleado" },
          },
          forecast: {
            forecastday: [
              {
                date: "09-08-2026",
                day: {
                  avgtemp_c: 20,
                  avghumidity: 60,
                  maxwind_kph: 10,
                  maxtemp_c: 24,
                  mintemp_c: 15,
                  condition: { text: "Soleado" },
                },
              },
              {
                date: "10-08-2026",
                day: {
                  avgtemp_c: 18,
                  avghumidity: 55,
                  maxwind_kph: 12,
                  maxtemp_c: 22,
                  mintemp_c: 14,
                  condition: { text: "Nublado" },
                },
              },
              {
                date: "11-08-2026",
                day: {
                  avgtemp_c: 17,
                  avghumidity: 50,
                  maxwind_kph: 8,
                  maxtemp_c: 21,
                  mintemp_c: 13,
                  condition: { text: "Lluvia" },
                },
              },
            ],
          },
        }),
    }),
  ) as jest.Mock;
});

// 1. Pantalla principal
test("renderiza la pantalla principal del clima", async () => {
  render(<Screen />);

  await waitFor(() => {
    expect(screen.getByTestId("screen-weather")).toBeTruthy();
  });
});

// 2. Encabezado de ciudad
test("muestra el nombre de la ciudad", async () => {
  render(<Screen />);

  await waitFor(() => {
    expect(screen.getByTestId("header-city").props.children).toBe("BUENOS AIRES");
  });
});

// 3. Navegación por días
test("permite navegar al día siguiente", async () => {
  render(<Screen />);

  await waitFor(() => {
    expect(screen.getByTestId("screen-weather")).toBeTruthy();
  });

  fireEvent.press(screen.getByTestId("button-next-day"));

  await waitFor(() => {
    expect(screen.getByTestId("navigation-current-day")).toBeTruthy();
  });
});

// 4. Ícono de condición climática
test("renderiza un ícono climático", async () => {
  render(<Screen />);

  await waitFor(() => {
    expect(screen.getByTestId(/icon-weather-/)).toBeTruthy();
  });
});

// 5. Métricas secundarias
test("renderiza al menos tres métricas secundarias", async () => {
  render(<Screen />);

  await waitFor(() => {
    expect(screen.getByTestId("screen-weather")).toBeTruthy();
  });

  expect(screen.getAllByTestId("metric-item").length).toBeGreaterThanOrEqual(3);
});

// 6. Temperatura principal
test("muestra la temperatura actual", async () => {
  render(<Screen />);

  await waitFor(() => {
    expect(screen.getByTestId("temp-current").props.children).toMatch(/°/);
  });
});

// 7. Temperatura mínima y máxima
test("muestra temperatura mínima y máxima", async () => {
  render(<Screen />);

  await waitFor(() => {
    expect(screen.getByTestId("temp-min")).toBeTruthy();
    expect(screen.getByTestId("temp-max")).toBeTruthy();
  });
});

// 🧪 Test de cumplimiento de testID (recomendado por la consigna)
test("la app expone todos los testID obligatorios", async () => {
  render(<Screen />);

  const requiredTestIds = [
    "screen-weather",
    "header-city",
    "button-prev-day",
    "button-next-day",
    "temp-current",
    "temp-min",
    "temp-max",
  ];

  await waitFor(() => {
    requiredTestIds.forEach((id) => {
      expect(screen.getByTestId(id)).toBeTruthy();
    });
  });
});