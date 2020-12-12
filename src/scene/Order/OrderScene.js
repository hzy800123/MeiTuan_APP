import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import DetailCell from '../../widget/DetailCell'
import OrderMenuItem from '../../widget/OrderMenuItem'
import SpacingView from '../../widget/SpacingView'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import * as api from '../../api'

type Props = {

}

type State = {
    typeIndex: number,
    data: Array<Object>,
    refreshState: number,
}

class OrderScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}) => ({
        title: '订单',
    })

    constructor(props: Object) {
        super(props)

        this.state = {
            typeIndex: 0,
            data: [],
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount() {
        this.requestFirstPage()
    }

    requestData = async() => {
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

        return dataList    
    }

    requestFirstPage = async() => {
        try {
            this.setState({refreshState: RefreshState.HeaderRefreshing})
            let dataList = await this.requestData()
            
            this.setState({
                data: dataList,
                refreshState: RefreshState.Idle,
            })
        } catch (error) {
            this.setState({
                refreshState: RefreshState.Failure,
            })
        }
    }


    requestNextPage = async() => {
        try {
            this.setState({refreshState: RefreshState.FooterRefreshing})
            let dataList = await this.requestData()
            
            this.setState({
                data: [...this.state.data, ...dataList],
                refreshState: this.state.data.length > 20 ? RefreshState.NoMoreData : RefreshState.Idle,
            })
        } catch (error) {
            this.setState({
                refreshState: RefreshState.Failure,
            })
        }
    }


    renderHeader = () => {
        return (
            <NearbyHeaderView
                titles={this.props.types}
                selectedIndex={this.state.typeIndex}
                onSelected={(index) => {
                    if(index != this.state.typeIndex) {
                        this.setState({typeIndex: index})
                        this.requestFirstPage()
                    }
                }}
            />
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


    renderHeader = () => {
        return (
            <View>
                <DetailCell
                    title='我的订单'
                    subtitle='全部订单'
                    style={{height: 38}}
                />
                <View style={styles.itemContainer}>
                    <OrderMenuItem
                        title='待付款'
                        icon={require('../../img/order/order_tab_need_pay.png')}
                    />
                    <OrderMenuItem
                        title='待使用'
                        icon={require('../../img/order/order_tab_need_use.png')}
                    />
                    <OrderMenuItem
                        title='待评价'
                        icon={require('../../img/order/order_tab_need_review.png')}
                    />
                    <OrderMenuItem
                        title='退款/售后'
                        icon={require('../../img/order/order_tab_needoffer_aftersale.png')}
                    />
                </View>

                <SpacingView />
                <DetailCell
                    title='我的收藏'
                    subtitle='查看全部'
                    style={{height: 38}}
                />
            </View>
        )
    }

    render() {
        return (
            <RefreshListView style={styles.container}
                ListHeaderComponent={this.renderHeader}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}

                refreshState={this.state.refreshState}
                onHeaderRefresh={this.requestFirstPage}
                onFooterRefresh={this.requestNextPage}
            />

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
    },
})

export default OrderScene
