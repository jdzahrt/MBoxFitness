import {NavigationContainer} from "@react-navigation/native";
import navigationTheme from "./app/navigation/NavigationTheme";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import {useEffect, useState} from "react";
import AppNavigator from "./app/navigation/AppNavigator";
import authStorage from "./app/auth/storage";
import * as SplashScreen from "expo-splash-screen";
import {View} from "react-native";
import * as Sentry from '@sentry/react-native';

// Sentry.init({
//   dsn: 'https://9ce9fc4d7a65bac758bcabb77138dd4f@o4509271345987584.ingest.us.sentry.io/4509271358504960',
//
//   // Configure Session Replay
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1,
//   integrations: [Sentry.mobileReplayIntegration()],
//
//   // uncomment the line below to enable Spotlight (https://spotlightjs.com)
//   // spotlight: __DEV__,
// });

export default function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        const storedUser = await authStorage.getUser();
        if (storedUser) setUser(storedUser);
      } catch (error) {
        console.log('Error restoring user:', error);
      } finally {
        setIsReady(true);
        // Hide splash screen after state is ready
        try {
          await SplashScreen.hideAsync();
        } catch (error) {
          console.log('Error hiding splash screen:', error);
        }
      }
    };
    
    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <OfflineNotice/>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator/> : <AuthNavigator/>}
      </NavigationContainer>
    </AuthContext.Provider>
  )
};
