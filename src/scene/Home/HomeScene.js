import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, FlatList} from 'react-native'
import color from '../../widget/color'
import NavigationItem from '../../widget/NavigationItem'
import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import SpacingView from '../../widget/SpacingView'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import Screen from '../../common/Screen'
import {Heading3} from '../../widget/Text'
import * as api from '../../api'

type Props = {

}

type State = {
    discounts: Array<Object>,
    dataList: Array<Object>,
    refreshing: boolean,
}

class HomeScene extends PureComponent<Props, State> {

    static navigationOptions = () => ({
        headerStyle: {backgroundColor: color.primary},
        headerTitle: () => (
            <TouchableOpacity style={styles.searchBar}>  
                <Image source={require('../../img/home/search_icon.png')} style={styles.searchIcon}/>
                <Text style={{fontSize: 14}}>搜索</Text>
            </TouchableOpacity>
        ),
        headerLeft: () => (
            <NavigationItem 
                title='定位' 
                titleStyle={{color: 'white', fontWeight: 'bold'}} 
                onPress={() => {
                    alert('test left')
                }}
            />
        ),
        headerRight: () => (
            <NavigationItem
                icon={require('../../img/mine/icon_navigationItem_message_white.png')}
                onPress={() => {
                    alert('test right')
                }}
            />
        )
    })

    constructor(props: Object) {
        super(props)

        this.state = {
            discounts: [],
            dataList: [],
            refreshing: false,
        }
    }
    
    componentDidMount() {
        this.requestData()
    }

    requestData = async() => {
        this.requestRecommend()
        this.requestDiscount()
    }

    requestRecommend = async() => {
        try {
            this.setState({refreshing: true})

            let json = api.recommend         

            let dataList = json.data.map((info) => ({
                id: info.id,
                imageUrl: info.squareimgurl,
                title: info.mname,
                subtitle: `[${info.range}${info.title}]`,
                price: info.price,
            }))

            dataList.sort((e1, e2) => {
                return 0.5 - Math.random()
            })

            setTimeout(() => {
                this.setState({
                    dataList: dataList,
                    refreshing: false,
                })
            }, 1000)

        } catch(error) {
            alert('error ' + error)
            this.setState({
                refreshing: false,
            })
        }
    }

    requestDiscount = async() => {
        try {
            let json = api.discount
            this.setState({discounts: json.data})

            // let response = fetch(api.discount)
            // let json = response.json()
            // this.setState({discounts: json.data})
            // alert('discount json ' + JSON.stringify(json.data))
        } catch(error) {
            alert('error ' + error)
        }
    }

    onGridSelected = (index) => {
        let discount = this.state.discounts[index]

        if(discount.type == 1) {
            let location = discount.tplurl.indexOf('http')
            let url = discount.tplurl.slice(location)
            this.props.navigation.navigate('WebScene', {url: url})
        }
    }

    renderHeader = () => {
        return (
            <View>
                <HomeMenuView
                    menuInfos={api.menuInfos}
                    onMenuSelected={(index) => {
                        // alert('test index ' + index)
                    }}
                />
                <SpacingView />
                <HomeGridView infos={this.state.discounts} onGridSelected={this.onGridSelected}/>
                <SpacingView />
                <View style={styles.recommendHeader}>
                    <Heading3>猜你喜欢</Heading3>
                </View>
            </View>
        )
    }

    onCellSelected = (info) => {
        this.props.navigation.navigate('GroupPurchaseScene', {info})
    }

    renderItem = (rowData) => {
        return (
            <GroupPurchaseCell
                info={rowData.item}
                onPress={this.onCellSelected}
            />            
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
              <FlatList
                    ListHeaderComponent={() => this.renderHeader()}
                    data={this.state.dataList}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}  
                    onRefresh={this.requestData}
                    refreshing={this.state.refreshing}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        width: Screen.width * 0.7,
        height: 30,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    },
    recommendHeader: {
        height: 35,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white',
    },
})

export default HomeScene
