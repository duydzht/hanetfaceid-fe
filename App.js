import "react-native-gesture-handler";
import { View } from "react-native";
import Container from "./src/Container";
import Container2 from "./src/Container2";
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
import CheckinS1 from "./src/pages/checkin-s1";
import CheckinS2 from "./src/pages/checkin-s2";
import Vr from "./src/pages/vr";
import Info from "./src/pages/info";
import CheckinOnline from "./src/pages/checkin-online";
import SeatMapsTQ from "./src/pages/seat-maps-tq";
import Discussions from "./src/pages/discussions";

import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";

import { linking } from "./src/linking";
import DiscussionViewer from "./src/pages/discussions-viewer";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
    "Alberta-Heavy": require("./assets/fonts/UTM-Alberta-Heavy.ttf"),
  });

  if (!fontsLoaded) {
    return <View />;
  } else {
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
                <Stack.Screen name="SeatMapsTQ" component={SeatMapsTQ} />
                <Stack.Screen name="Documents" component={Documents} />
                <Stack.Screen
                  name="DocumentViewer"
                  component={DocumentViewer}
                />

                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Container" component={Container} />
                <Stack.Screen name="Container2" component={Container2} />
                <Stack.Screen name="Report" component={Report} />
                <Stack.Screen name="Checkin" component={Checkin} />
                <Stack.Screen name="CheckinS1" component={CheckinS1} />
                <Stack.Screen name="CheckinS2" component={CheckinS2} />
                <Stack.Screen name="Vr" component={Vr} />
                <Stack.Screen name="Info" component={Info} />
                <Stack.Screen name="CheckinOnline" component={CheckinOnline} />
                <Stack.Screen name="Discussions" component={Discussions} />
                <Stack.Screen
                  name="DiscussionViewer"
                  component={DiscussionViewer}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </DripsyProvider>
        </GestureHandlerRootView>
      </StoreProvider>
    );
  }
}
