import "react-native-gesture-handler";
import Container from "./src/Container";
import Report from "./src/Report";
import Login from "./src/Login";
import { StoreProvider } from "./src/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DripsyProvider } from "dripsy";
import { theme } from "./src/theme";

import Home from "./src/pages/home";
import News from "./src/pages/news";
import Profiles from "./src/pages/profiles";
import Programs from "./src/pages/programs";
import SeatMaps from "./src/pages/seat-maps";
import Documents from "./src/pages/documents";
import Article from "./src/pages/article";
import DocumentViewer from "./src/pages/document-viewer";
import Checkin from "./src/pages/checkin";
import Vr from "./src/pages/vr";

import { linking } from "./src/linking";

const Stack = createStackNavigator();

export default function App() {
  return (
    <StoreProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DripsyProvider theme={theme}>
          <NavigationContainer linking={linking}>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="News" component={News} />
              <Stack.Screen name="Article" component={Article} />
              <Stack.Screen name="Profiles" component={Profiles} />
              <Stack.Screen name="Programs" component={Programs} />
              <Stack.Screen name="SeatMaps" component={SeatMaps} />
              <Stack.Screen name="Documents" component={Documents} />
              <Stack.Screen name="DocumentViewer" component={DocumentViewer} />

              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Container" component={Container} />
              <Stack.Screen name="Report" component={Report} />
              <Stack.Screen name="Checkin" component={Checkin} />
              <Stack.Screen name="Vr" component={Vr} />
            </Stack.Navigator>
          </NavigationContainer>
        </DripsyProvider>
      </GestureHandlerRootView>
    </StoreProvider>
  );
}
