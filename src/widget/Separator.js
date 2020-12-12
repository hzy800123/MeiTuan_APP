import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, ViewPropTypes} from 'react-native'
import color from './color'
import Screen from '../common/Screen'

type Props = {

}

type State = {

}

class Separator extends PureComponent<Props, State> {

    render() {
        return (
            <View 
                style={styles.separator}
            />
        )
    }
}

const styles = StyleSheet.create({
    separator: {
        width: Screen.width, 
        height: StyleSheet.hairlineWidth, 
        backgroundColor: color.border
    }
})

export default Separator