import '@/global.css';

import { Stack } from 'expo-router';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {

  return (
<<<<<<< HEAD
    <>
=======
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
>>>>>>> dccc1259edd879eb3521d93d7b3ae2ca40df6a68
      <Stack/>
    </>
  );
}