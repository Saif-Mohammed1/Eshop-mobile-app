import React, { useEffect } from "react";
import {
  AntDesign,
  EvilIcons,
  FontAwesome5,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { fetchHomeItem } from "../utils/apiUtils";
import HomeScreen from "../screens/homeScreen";
import ShopScreen from "../screens/shopScreen";
import Category from "../category/category";
import SignIn from "../sign-In/signIn";
import SignUp from "../signUp/signUp";
import CartScreen from "../screens/cartScreen";
import CustomDrawerContent from "./customNav/CustomDrawer";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { useRef } from "react";
import { useState } from "react";
import SearchScreen from "../screens/searchScreen";
import DashboardScreen from "../screens/dashboardScreen";
import { selectCartCount } from "../store/cart/cartSelector";
import ContactScreen from "../screens/contactScreen";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const NavigateStack = () => (
  <Stack.Navigator
    // screenOptions={{ headerShown: false }}
    initialRouteName="HomeScreen"
    // initialRouteName="HomeTap"
  >
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen name="Log-In" component={SignIn} /> */}

    <Stack.Screen name="Category" component={Category} />
  </Stack.Navigator>
);
const NavStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomePage"
      component={Navigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={SignIn} />
    <Stack.Screen
      name="Sign-Up"
      component={SignUp}
      // options={{ headerShown: false }}
    />
    <Stack.Screen name="Contact Us" component={ContactScreen} />
  </Stack.Navigator>
);

const NavigateDrawing = () => {
  //  drawerType = "front";
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      // drawerType="front"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="HomeTap"
        component={NavStack}
        options={{
          title: "Home",
        }}
      />
      {/* <Drawer.Screen name="Contact Us" component={ContactScreen} /> */}
    </Drawer.Navigator>
  );
};
const CustomTabBarButton = (
  // props,
  { navigation, state }
) => {
  const [selectedTap, setSelectedTap] = useState("Home");

  const { routes } = state;

  const FlatRef = useRef();
  const updateSelectedTap = (tap) => {
    if (selectedTap !== tap) {
      setSelectedTap(tap);
      navigation.navigate(tap);
    }
  };
  const textColor = {
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1.1,
    fontSize: 19,
    opacity: 0.6,
  };
  const Color = (currentTap) =>
    currentTap === selectedTap ? { ...textColor, opacity: 1 } : textColor;
  // console.log("route key", props.route.key);

  const ItemRender = ({ color, route }) => {
    return (
      <TouchableOpacity onPress={() => updateSelectedTap(route.name)}>
        <Text
          style={{
            ...color,
          }}
        >
          {route.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        // alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(146, 32, 108, 0.877)",
          padding: 20,
          alignItems: "center",
          borderRadius: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {Object.keys(routes).map((item) => {
          const route = routes[item];
          return (
            <ItemRender
              key={route.name}
              color={Color(route.name)}
              route={route}
            />
          );
        })}
        {/* <FlatList
          data={Object.keys(routes)}
          keyExtractor={(ref) => (FlatRef.current = ref)}
          renderItem={({ item }) => {
            const route = routes[item];
            return <ItemRender color={Color(route.name)} route={route} />;
          }}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        /> */}
      </View>
    </View>
  );
};

const Navigator = () => {
  // const navigation = useNavigation(); // Use the useNavigation hook to get the navigation prop
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  useEffect(() => {
    fetchHomeItem(dispatch);
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarStyle: { height: 53 },
        tabBarHideOnKeyboard: true,
      }}
      // tabBar={(props) => <CustomTabBarButton {...props} />}
    >
      <Tab.Screen
        name="Slug"
        component={NavigateDrawing}
        options={{
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="navicon" size={size} color={color} />
          ),
          // headerShown: false,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.dispatch(DrawerActions.toggleDrawer()); // Toggle drawer on tab press
            e.preventDefault();
            // navigation.toggleDrawer(); // Toggle drawer on tab press
          },
        })}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={NavigateStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={"red"} />
          ),
          tabBarButton: () => {
            return (
              <View
                style={{
                  width: 55,
                  height: 55,
                  top: -2,
                  borderRadius: 50, // Use numeric value for borderRadius
                  borderWidth: 2, // Use numeric value for borderWidth
                  borderColor: "#eee", // Color of the circular border
                  backgroundColor: "#eee", // Background color for the circular button
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#eee",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 2,
                  shadowRadius: 4,
                  elevation: 5, // For Android
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("Home")}
                >
                  <Ionicons name="home" size={32} color={"red"} />
                </TouchableWithoutFeedback>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: cartCount,
          tabBarBadgeStyle: {
            backgroundColor: "gray",
            color: "white",
            // position: "absolute",
            // top: "35%",
            // // bottom: 0,
            // left: -9,
          },
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="bag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ShopScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// export default Navigator;
export default NavigateDrawing;
