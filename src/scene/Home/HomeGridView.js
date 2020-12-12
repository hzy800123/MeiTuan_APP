import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import HomeGridItem from './HomeGridItem'
import color from '../../widget/color'

type Props = {
    infos: Array<Object>,
    onGridSelected: Function,
}

type State = {

}

class HomeGridView extends PureComponent<Props, State> {

    render() { 
        let {infos, onGridSelected} = this.props
        return (
            <View style={styles.container}>
                {infos.map((info, index) => (
                    <HomeGridItem
                        key={index}
                        info={info}
                        onPress={() => {
                            onGridSelected(index)
                        }}
                    />
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: color.border,
    }
})

export default HomeGridView
