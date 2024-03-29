import React from 'react';
import {Text} from 'react-native'
import {colors} from '../pages/Styles'

const CustomText = (props: any) => {
    return (
        <Text style={{fontFamily: "FiraSans-Regular", fontSize: 18, color: colors.black, ...props.style}}>{props.children}</Text>
    );
}

export default CustomText;

