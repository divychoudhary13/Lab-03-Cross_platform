import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContactProvider } from './src/utils/ContactContext';
import ContactListScreen from './src/screens/ContactList/ContactListScreen';
import AddContactScreen from './src/screens/AddContact/AddContactScreen';
import ContactDetailsScreen from './src/screens/ContactDetails/ContactDetailsScreen'; 

// A stack navigator for handling screen navigation
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // Provide global state for managing contacts throughout the app
    <ContactProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#3498db" />
        <Stack.Navigator initialRouteName="ContactList">
          <Stack.Screen 
            name="ContactList" 
            component={ContactListScreen} 
            options={{ title: 'Contacts' }} 
          />
          <Stack.Screen 
            name="AddContact" 
            component={AddContactScreen} 
            options={{ title: 'Add Contact' }} 
          />
          <Stack.Screen 
              name="ContactDetails" 
              component={ContactDetailsScreen} 
              options={{ title: 'Contact Details' }} 
            />
        </Stack.Navigator>
      </NavigationContainer>
    </ContactProvider>
  );
};

export default App;
