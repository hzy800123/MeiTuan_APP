import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import color from '../../widget/color'
import NavigationItem from '../../widget/NavigationItem'
import {Heading1, Heading2, Paragraph} from '../../widget/Text'
import Screen from '../../common/Screen'
import Button from '../../widget/Button'
import Separator from '../../widget/Separator'

type Props = {

}

type State = {

}

class GroupPurchaseScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}) => ({
        headerTitle: '团购详情',
        headerRight: () => (
            <NavigationItem
                icon={require('../../img/public/icon_navigationItem_share.png')}
                onPress={() => {
                    alert('share')
                }}
            />
        )
    })
    

    render() {
        let {info} = this.props.navigation.state.params
        let imageUrl = info.imageUrl.replace('w.h', '1080.0')

        return (
            <View style={styles.container}>
                <View>
                    <Image
                        source={{uri: imageUrl}}
                        style={styles.banner}
                    />
                    <View style={styles.topContainer}>
                        <Heading2 style={{color: color.primary}}>¥</Heading2>
                        <Heading1 style={{marginBottom: -6}}>{info.price}</Heading1>
                        <Paragraph style={{marginLeft: 10}}>门市价：{(info.price * 1.1).toFixed(0)}</Paragraph>
                        <View style={{flex: 1}}></View>
                        <Button
                            title='立即抢购'
                            titleStyle={{color: 'white', fontSize: 18, fontWeight: 'bold'}}
                            style={styles.buyButton}
                        />
                    </View>
                </View>

                <Separator/>

                <View style={styles.tagContainer}>
                    <Image 
                        source={require('../../img/home/icon_deal_anytime_refund.png')}
                        style={{width: 20, height: 20}}           
                    />
                    <Paragraph style={{color: '#89B24F'}}> 随时退</Paragraph>
                    <View style={{flex: 1}}></View>
                    <Paragraph>已售123</Paragraph>
                </View> 
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    banner: {
        width: Screen.width,
        height: Screen.width,
    },
    topContainer: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    tagContainer: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
    },
    buyButton: {
        backgroundColor: color.primary,
        width: 94,
        height: 36,
        borderRadius: 7,
    }
})

export default GroupPurchaseScene
