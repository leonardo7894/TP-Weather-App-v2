import { render, renderHook, waitFor } from "@testing-library/react-native";
import useClima from "@/src/hooks/useClima";

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
            icon: "sunIcon",
          },
          forecast: {
            forecastday: [
              {
                date: "19-06-2026",
                day: {
                  maxtemp_c: 14.5,
                  mintemp_c: 7.1,
                  condition: {
                    text: "Soleado",
                  },
                },
              },
            ],
          },
        }),
    }),
  ) as jest.Mock;
});

test("muestra la ciudad correctamente", async () => {
  const { result } = await renderHook(() => useClima());

  await waitFor(() => {
    expect(result.current.clima?.ciudad).toBe("Luis J. Garcia");
  });
});

test("muestra el dia correctamente", async () => {
  const { result } = await renderHook(() => useClima());

  await waitFor(() => {
    expect(result.current.clima?.fecha).toBe("19/6/2026");
  });
});

// test('renderiza la pantalla principal del clima', () => {
// const { getByTestId } = render(<Screen />);
// expect(getByTestId('screen-weather')).toBeTruthy();
// });

test("muestra icono correctamente", async () => {
  const { result } = await renderHook(() => useClima());

  await waitFor(() => {
    expect(result.current.clima?.icon).toBe("sunIcon");
  });
});

test("muestra la temperaturas correctamente", async () => {
  const { result } = await renderHook(() => useClima());

  await waitFor(() => {
    expect(result.current.dias[0].day.mintemp_c).toBe(7.1);
    expect(result.current.dias[0].day.maxtemp_c).toBe(14.5);
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
