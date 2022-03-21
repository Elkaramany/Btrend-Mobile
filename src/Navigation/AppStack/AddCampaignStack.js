import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Index from '../../Screens/Collaborations/AddCampaign'
import CoverPhoto from '../../Screens/Collaborations/AddCampaign/CoverPhoto'
import Title from '../../Screens/Collaborations/AddCampaign/Title'
import GenderAge from '../../Screens/Collaborations/AddCampaign/GenderAge'
import Languages from '../../Screens/Collaborations/AddCampaign/Languages'
import Categories from '../../Screens/Collaborations/AddCampaign/Categories'
import Tags from '../../Screens/Collaborations/AddCampaign/Tags'
import Information from '../../Screens/Collaborations/AddCampaign/Information'
import ReferencePhotos from '../../Screens/Collaborations/AddCampaign/ReferencePhotos'
import Payment from '../../Screens/Collaborations/AddCampaign/Payment'
import SocialMedia from '../../Screens/Collaborations/AddCampaign/SocialMedia'
import FinalCampaign from "../../Screens/Collaborations/AddCampaign/FinalCampaign";
import Congrats from '../../Screens/Collaborations/AddCampaign/Congrats'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={'Index'}
        >
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="CoverPhoto" component={CoverPhoto} />
            <Stack.Screen name="Title" component={Title} />
            <Stack.Screen name="GenderAge" component={GenderAge} />
            <Stack.Screen name="Languages" component={Languages} />
            <Stack.Screen name="CategoriesCampaign" component={Categories} />
            <Stack.Screen name="Tags" component={Tags} />
            <Stack.Screen name="Information" component={Information} />
            <Stack.Screen name="ReferencePhotos" component={ReferencePhotos} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="SocialMediaCampaign" component={SocialMedia} />
            <Stack.Screen name="FinalCampaign" component={FinalCampaign} />
            <Stack.Screen name="CongratsCampaign" component={Congrats} />
        </Stack.Navigator>
    );
};