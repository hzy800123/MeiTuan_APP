import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, ViewPropTypes} from 'react-native'
import Separator from './Separator'
import {Heading3} from './Text'
import Screen from '../common/Screen'

type Props = {
    onPress: Function,
    icon: any,
    title: string,
}

type State = {

}

class OrderMenuItem extends PureComponent<Props, State> {

    render() {
        let {onPress, icon, title} = this.props

        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image source={icon} resizeMode='contain' style={styles.icon} />
                <Heading3>{title}</Heading3>
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Screen.width / 4,
        height: Screen.width / 5,
    },
    icon: {
        width: 30,
        height: 30,
        margin: 3,
    }
})

export default OrderMenuItem