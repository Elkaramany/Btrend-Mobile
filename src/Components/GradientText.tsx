import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-community/masked-view";
import { LinearTextGradient } from "react-native-text-gradient";
import { GlobalStyles } from "../Config";

const GradientText = (props: any) => {
    return (
        <LinearTextGradient
            style={{ fontWeight: 'bold', fontSize: 72 }}
            locations={[0, 1]}
            colors={props.color}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            {props.text}
        </LinearTextGradient>
    );
};

export default GradientText;