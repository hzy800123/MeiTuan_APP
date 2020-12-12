/* @flow */

import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import Screen from '../../common/Screen'
import color from '../../widget/color'
import {Heading2, Heading3} from '../../widget/Text'

type Props = {
    info: Object,
    onPress: Function,
}

type State = {

}

class HomeGridItem extends PureComponent<Props, State> {
   
    render() {
        let {info, onPress} = this.props

        let title = info.maintitle
        let color = info.typeface_color
        let subtitle = info.deputytitle
        let imageUrl = info.imageurl.replace('w.h', '120.0')
 
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View>
                    <Heading2 style={{fontSize: 18, color: color, marginBottom: 10}}>
                        {title} 
                    </Heading2>
                    <Heading3>
                        {subtitle}
                    </Heading3>
                </View>
                <Image style={styles.icon} source={{uri: imageUrl}}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Screen.width / 2 - StyleSheet.hairlineWidth,
        height: Screen.width / 4,
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: color.border,
    },
    icon: {
        width: Screen.width / 5,
        height: Screen.width / 5,
        marginLeft: 10,
    }
})

export default HomeGridItem
