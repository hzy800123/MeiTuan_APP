import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import Screen from '../../common/Screen'
import {Paragraph} from '../../widget/Text'
import color from '../../widget/color'

type Props = {
    titles: Array<string>,
    selectedIndex: number,
    onSelected: Function,
}

type State = {

}

class NearbyHeaderView extends PureComponent<Props, State> {

    render() { 
        let {titles, onSelected, selectedIndex} = this.props

        return (
            <View style={styles.container}>
                {titles.map((title, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            onSelected(index)
                        }}
                        style={[styles.item, {backgroundColor: selectedIndex == index ? '#fe566d' : 'white'}]}
                    >
                        <Paragraph style={{color: selectedIndex == index ? 'white' : '#555555'}}>{title}</Paragraph>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',        
    },
    item: {
        width: Screen.width / 4 - 10,
        height: 30,
        marginLeft: 8,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: color.border,
    }
})

export default NearbyHeaderView
