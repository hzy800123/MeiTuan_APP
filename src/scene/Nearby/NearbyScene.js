import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'
import {Heading3, Paragraph} from '../../widget/Text'
import Screen from '../../common/Screen'
import color from '../../widget/color'
import NearbyListScene from './NearbyListScene'

type Props = {

}

type State = {

}

class NearbyScene extends PureComponent<Props, State> {

    static navigationOptions = () => ({
        headerLeft: () => (
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                <Image 
                    style={{width: 13, height: 16, marginRight: 5}}
                    source={require('../../img/public/icon_food_merchant_address.png')}
                />
                <Heading3>广州 小蛮腰</Heading3> 
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity style={styles.searchBar}>
                <Image source={require('../../img/home/search_icon.png')} style={styles.searchIcon}/>
                <Paragraph>找附近的吃喝玩乐</Paragraph>
            </TouchableOpacity>
        )
    })

    render() {
        let titles = ['享美食', '住酒店', '爱玩乐', '全部']
        let types = [
            ['热门', '面包甜点', '小吃快餐', '川菜', '日本料理', '韩国料理', '台湾菜', '东北菜'],
            ['热门', '商务出行', '公寓民宿', '情侣专享', '高星特惠'],
            ['热门', 'KTV', '足疗按摩', '洗浴汗蒸', '电影院', '美发', '美甲'],
            []
        ]

        return (
            <ScrollableTabView
                style={styles.container}
                tabBarBackgroundColor='white'
                tabBarActiveTextColor='#FE566D'
                tabBarInactiveTextColor='#555555'
                tabBarTextStyle={styles.tabBarText}
                tabBarUnderlineStyle={styles.tabBarUnderline}
            > 
                {titles.map((title, index) => (
                    <NearbyListScene 
                        key={index} 
                        tabLabel={title}
                        types={types[index]}
                        navigation={this.props.navigation}
                    />
                ))}
            </ScrollableTabView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper,
    },
    tabBarText: {
        fontSize: 14,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: '#fe566d',
    },
    searchBar: {
        width: Screen.width * 0.65,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        alignSelf: 'flex-end',
        marginRight: 20,
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    },
})

export default NearbyScene
