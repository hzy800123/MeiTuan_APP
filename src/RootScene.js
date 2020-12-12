import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import {TabBarBottom, createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createStackNavigator} from 'react-navigation-stack'
import TabBarItem from './widget/TabBarItem'
import color from './widget/color'
import HomeScene from './scene/Home/HomeScene'
import MineScene from './scene/Mine/MineScene'
import NearbyScene from './scene/Nearby/NearbyScene'
import OrderScene from './scene/Order/OrderScene'
import WebScene from './scene/Web/WebScene'
import GroupPurchaseScene from './scene/GroupPurchase/GroupPurchaseScene'

class RootScene extends PureComponent<{}> {

    render() {
        return (
            <AppContainer />
        )
    }
}

const Tab = createBottomTabNavigator({
    Home: {
        screen: createStackNavigator({ Home: HomeScene }),
        navigationOptions: () => ({
            tabBarLabel: '团购',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/tabbar_homepage.png')}
                    selectedImage={require('./img/tabbar/tabbar_homepage_selected.png')}
                />
            )
        })
    },
    Nearby: {
        screen: createStackNavigator({ Nearby: NearbyScene }),
        navigationOptions: () => ({
            tabBarLabel: '附近',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/tabbar_merchant.png')}
                    selectedImage={require('./img/tabbar/tabbar_merchant_selected.png')}
                />
            )
        })
    },
    Order: { 
        screen: createStackNavigator({ Order: OrderScene }),
        navigationOptions: () => ({
            tabBarLabel: '订单',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/tabbar_order.png')}
                    selectedImage={require('./img/tabbar/tabbar_order_selected.png')}
                />
            )
        })
    },
    Mine: {
        screen: createStackNavigator({ Mine: MineScene }),
        navigationOptions: () => ({
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/tabbar_mine.png')}
                    selectedImage={require('./img/tabbar/tabbar_mine_selected.png')}
                />  
            )
        })
    }
}, {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazy: true,
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: color.primary,
            inactiveTintColor: color.gray,
            style: {
                backgroundColor: 'white'
            }
        }
    }
)

Tab.navigationOptions = {
    // header: null
    headerShown: false,
    // title: ''
}

const AppNavigator = createStackNavigator({
    Tab: { screen: Tab },
    WebScene: { screen: WebScene },
    GroupPurchaseScene: { screen: GroupPurchaseScene }
}, {
    defaultNavigationOptions: {
        // headerBackTitle: () => null,
        headerBackTitleVisible: false,
        headerTintColor: '#333333',
    }
})

const AppContainer = createAppContainer(AppNavigator)

const styles = StyleSheet.create({

})

export default RootScene