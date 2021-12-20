import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '../Config';

const Spinner: React.FC<{ size?: boolean, spinnerColor?: string }> = ({ size, spinnerColor }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ActivityIndicator
                size={size == true ? 'small' : 'large'}
                color={spinnerColor || Colors.secondary}
            />
        </View>
    );
}

export default Spinner;