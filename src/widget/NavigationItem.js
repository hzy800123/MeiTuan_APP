import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, ViewPropTypes} from 'react-native'

type Props = {
    title?: string,
    titleStyle?: ViewPropTypes.type,
    icon?: any,
    iconStyle?: ViewPropTypes.style,
    onPress?: Function,
}

type State = {

}

class NavigationItem extends PureComponent<Props, State> {

    render() {
        let {title, titleStyle, icon, iconStyle, onPress} = this.props
        
        let titleElement = title && (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
        )
        let iconElement = icon && (
            <Image source={icon} style={[styles.icon, iconStyle]}/>
        )
        return (
            <TouchableOpacity onPress={onPress} style={styles.container}>
                {titleElement}
                {iconElement}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: '#333333',
        margin: 12,
    },
    icon: {
        width: 27,
        height: 27,
        margin: 12,
    }
})

export default NavigationItem