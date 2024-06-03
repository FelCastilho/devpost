import { NavigationContainer } from "@react-navigation/native"

import Routes from "./src/routes/index.js";
import AuthProvider from "./src/contexts/auth.js";
import { StatusBar } from "react-native";

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#36393F" barStyle="light-content" translucent={false}/>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  )
}