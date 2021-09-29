import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PhotoScreen from './PhotoScreen';
import AlbumScreen from "./AlbumScreen";

const Stack = createStackNavigator();

const AlbumStackScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyAlbum"
                          component={AlbumScreen}
                          options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}
export default AlbumStackScreen;
