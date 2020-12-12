import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import Screen from '../../common/Screen'

type Props = {
    title: string,
    icon: any,
    onPress: Function,
}

type State = {

}

class HomeMenuItem extends PureComponent<Props, State> {

    render() { 
        let {title, icon, onPress} = this.props

        return (
           <TouchableOpacity style={styles.container} onPress={onPress}>
               <Image source={icon} style={styles.icon}/>
               <Text>{title}</Text>
 
           </TouchableOpacity> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Screen.width / 5,
        height: Screen.width / 5,
    },
    icon: {
        width: Screen.width / 9,
        height: Screen.width / 9,
        margin: 5,
    },
})

export default HomeMenuItem
