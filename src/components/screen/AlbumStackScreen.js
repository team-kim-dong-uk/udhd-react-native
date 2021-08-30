import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PhotoScreen from './PhotoScreen';
import AlbumScreen from "./AlbumScreen";

const Stack = createStackNavigator();

const SearchStackScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyAlbum"
                          component={AlbumScreen}
                          options={{headerShown: false}}/>
            <Stack.Screen name="PhotoDetail" component={PhotoScreen} />
        </Stack.Navigator>
    );
}
export default SearchStackScreen;
