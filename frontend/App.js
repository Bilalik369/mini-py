import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import useAuthStore from "./src/store/authStore";

import HomeScreen       from "./src/screens/HomeScreen";
import LoginScreen      from "./src/screens/LoginScreen";
import SignupScreen     from "./src/screens/SignupScreen";

import DashboardScreen  from "./src/screens/DashboardScreen";
import CreatePlanScreen from "./src/screens/CreatePlanScreen";
import PlanDetailScreen from "./src/screens/PlanDetailScreen";

const Stack = createNativeStackNavigator();

const NAV_OPTIONS = { headerShown: false, animation: "slide_from_right" };

export default function App() {
  const { user } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={NAV_OPTIONS}>
        {user ? (
          <>
            <Stack.Screen name="Dashboard"  component={DashboardScreen}  />
            <Stack.Screen name="CreatePlan" component={CreatePlanScreen} />
            <Stack.Screen name="PlanDetail" component={PlanDetailScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home"   component={HomeScreen}   />
            <Stack.Screen name="Login"  component={LoginScreen}  />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
