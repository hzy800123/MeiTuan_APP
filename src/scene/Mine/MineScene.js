import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, ScrollView, RefreshControl} from 'react-native'
import NavigationItem from '../../widget/NavigationItem'
import color from '../../widget/color'
import {Heading1, Heading2, Heading3, Paragraph} from '../../widget/Text'
import SpacingView from '../../widget/SpacingView'
import DetailCell from '../../widget/DetailCell'
import Screen from '../../common/Screen'

type Props = {

}

type State = {
    isRefreshing: boolean,
}

class MineScene extends PureComponent<Props, State> {

    static navigationOptions = () => ({
        title: '',
        headerRight: () => (
            <View style={{flexDirection: 'row'}}>
                <NavigationItem
                    icon={require('../../img/mine/icon_navigationItem_set_white.png')}
                    onPress={() => {
                        alert('test setting button')
                    }}
                />
                <NavigationItem
                    icon={require('../../img/mine/icon_navigationItem_message_white.png')}
                    onPress={() => {
                        alert('test message button')
                    }}
                />                
            </View>
        ),
        headerStyle: {
            backgroundColor: color.primary,
            elevation: 0,       // remove shadow on Android
            // borderBottomWidth: 0,
            shadowOpacity: 0,   // remove shadow on iOS
        }
    })


    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false,
        }
    }


    onHeaderRefresh = () => {
        this.setState({isRefreshing: true})

        setTimeout(() => {
            this.setState({isRefreshing: false})            
        }, 2000)
    }


    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={require('../../img/mine/avatar.png')}
                />
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Heading2 style={{fontWeight: 'bold', color: 'white'}}>John</Heading2>
                        <Image source={require('../../img/mine/beauty_technician_v15.png')}/>
                    </View>
                    <Paragraph style={{fontWeight: 'bold', color: 'white', marginTop: 10}}>个人信息</Paragraph>
                </View>

            </View>
        )
    }


    getDataList = () => {
        return (
            [
                [
                    {title: '我的钱包', subtitle: '办信用卡', image: require('../../img/mine/icon_mine_wallet.png')},
                    {title: '余额', subtitle: '￥95872385', image: require('../../img/mine/icon_mine_balance.png')},
                    {title: '抵用券', subtitle: '63', image: require('../../img/mine/icon_mine_voucher.png')},
                    {title: '会员卡', subtitle: '2', image: require('../../img/mine/icon_mine_membercard.png')}
                ],
                [
                    {title: '好友去哪', image: require('../../img/mine/icon_mine_friends.png')},
                    {title: '我的评价', image: require('../../img/mine/icon_mine_comment.png')},
                    {title: '我的收藏', image: require('../../img/mine/icon_mine_collection.png')},
                    {title: '会员中心', subtitle: 'v15', image: require('../../img/mine/icon_mine_membercenter.png')},
                    {title: '积分商城', subtitle: '好礼已上线', image: require('../../img/mine/icon_mine_member.png')}
                ],
                [
                    {title: '客服中心', image: require('../../img/mine/icon_mine_customerService.png')},
                    {title: '关于美团', subtitle: '我要合作', image: require('../../img/mine/icon_mine_aboutmeituan.png')}
                ]
            ]
        )
    }
    

    renderCells = () => {
        let cells = []
        let dataList = this.getDataList()

        for(let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for(let j = 0; j < sublist.length; j++) {
                let data = dataList[i][j]
                let cell = (
                    <DetailCell
                        title={data.title}
                        subtitle={data.subtitle}
                        image={data.image}
                        key={data.title}
                    />
                )
                cells.push(cell)
            }
            cells.push(
                <SpacingView key={i} />
            )
        }

        return (
            <View>
                {cells}
            </View>
        )
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: color.paper}}>
                <View style={styles.headerBackground} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onHeaderRefresh}
                            tintColor='gray'
                        />
                    }
                >
                    {this.renderHeader()}
                    <SpacingView />
                    {this.renderCells()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: color.primary,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    headerBackground: {
        position: 'absolute',
        width: Screen.width,
        height: Screen.width / 2,
        backgroundColor: color.primary,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51d3c6',
    }

})

export default MineScene
