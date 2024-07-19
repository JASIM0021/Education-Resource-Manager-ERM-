import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import GolbalStyle from '../../Style';

const CustomTextInput = ({label, values, handleChange, handleBlur, isSecure, touched, errors }) => {
    const [secureText, setSecureText] = React.useState(true);
    const toggleSecureTextEntry = () => {
        setSecureText(!secureText);
    };
    return (
        <TextInput
        style={[GolbalStyle.mtSM]}
        
            mode="outlined"
            label={label}
            secureTextEntry={isSecure ? secureText : false}
            value={values}
            onChangeText={handleChange}
            onBlur={handleBlur}
            right={isSecure ?
                <TextInput.Icon
                    icon={secureText ? "eye-off" : "eye"}
                    onPress={toggleSecureTextEntry}
                /> : <></>
            }

            error={Boolean(touched) && Boolean(errors)}

        />
    )
}


export default CustomTextInput

const styles = StyleSheet.create({})