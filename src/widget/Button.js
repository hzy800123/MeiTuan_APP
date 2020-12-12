import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, ViewPropTypes} from 'react-native'

type Props = {
    onPress: Function,
    disabled: boolean,
    style: ViewPropTypes.style,
    title: String,
    titleStyle: ViewPropTypes.style,
    activeOpacity: number,
}

type State = {

}

class Button extends PureComponent<Props, State> {

    static defaultProps = {
        disabled: false,
        activeOpacity: 0.8,
    }

    render() {
        let {onPress, disabled, style, title, titleStyle, activeOpacity} = this.props
        
        return (
            <TouchableOpacity
                style={[styles.container, style]}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={activeOpacity}
            >
                <Text style={titleStyle}>
                    {title}
                </Text>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Button