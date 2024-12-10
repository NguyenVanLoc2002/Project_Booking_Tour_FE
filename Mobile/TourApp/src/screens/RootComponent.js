import MainComponent from "./MainComponent"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTour from "../components/HomeComponent/HomeComponent"
import AccountComponent from "../components/AccountComponent/AccountComponent"
import AccountDetail from "../components/AccountComponent/component/AccountDetail"
import PassengerDetail from "../components/AccountComponent/component/PassengerDetail"
import FormEditPassenger from "../components/AccountComponent/component/FormEditPassenger"
import BookingComponent from "../components/BookingComponent/ListBookingComponent"
import NotificationComponent from "../components/NotificationComponent/NotificationComponent"
import SavedListComponent from "../components/SavedListComponent/SavedListComponent"
import DetailTour from "../components/TourComponent/DetailTour"
import DatTour from "../components/TourComponent/DatTour"
import Tour from "../components/HomeComponent/component/TourComponent"
import ListTour from "../components/TourComponent/ListTour"
import SetCriteria from "../components/HomeComponent/component/SetCriteria"
import Login from "../components/LoginComponent/Login"
import Register from "../components/LoginComponent/Register"
import Authentic from "../components/LoginComponent/Authentic"
import Payment from "../components/BookingComponent/component/Payment";
import PayPal from "../components/BookingComponent/component/PayPal";
const Stack = createNativeStackNavigator();

export default function RootComponent() {

  return  (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="TourComponent"
        component={MainComponent}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen name="Login" component={Login} />
       <Stack.Screen name="Register" component={Register} />
       <Stack.Screen name="Authentic" component={Authentic} />
       <Stack.Screen name="HomeTour" component={HomeTour} />
       <Stack.Screen name="AccountComponent" component={AccountComponent} />
       <Stack.Screen name="AccountDetail" component={AccountDetail} />
       <Stack.Screen name="PassengerDetail" component={PassengerDetail} />
       <Stack.Screen name="FormEditPassenger" component={FormEditPassenger} />
       <Stack.Screen name="BookingComponent" component={BookingComponent} />
       <Stack.Screen name="NotificationComponent" component={NotificationComponent} />
       <Stack.Screen name="SavedListComponent" component={SavedListComponent} />
       <Stack.Screen name="DetailTour" component={DetailTour} />
       <Stack.Screen name="DatTour" component={DatTour} />
       <Stack.Screen name="ListTour" component={ListTour} />
       <Stack.Screen name="Tour" component={Tour} />
       <Stack.Screen name="SetCriteria" component={SetCriteria} />
       <Stack.Screen name="Payment" component={Payment} />
       <Stack.Screen name="PayPal" component={PayPal} />
    </Stack.Navigator>
  ) 
}