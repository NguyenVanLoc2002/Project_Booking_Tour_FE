import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Main from "./src/screens/RootComponent"
export default function App() {
  return (
    <NavigationContainer >
      <Main/>
      <Toast />
    </NavigationContainer>

  );
}
