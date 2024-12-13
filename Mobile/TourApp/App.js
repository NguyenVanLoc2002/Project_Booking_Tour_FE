import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Main from "./src/screens/RootComponent";
import { AuthContextProvider } from "./src/contexts/AuthContext";
export default function App() {
  return (
    <NavigationContainer >
      <AuthContextProvider>

        <Main />

      </AuthContextProvider>
      <Toast />
    </NavigationContainer>

  );
}
