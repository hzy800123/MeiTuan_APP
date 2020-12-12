import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import Screen from '../../common/Screen'
import NearbyHeaderView from './NearbyHeaderView'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import * as api from '../../api'

type Props = {

}

type State = {
    typeIndex: number,
    data: Array<Object>,
    refreshState: number,
}

class NearbyListScene extends PureComponent<Props, State> {

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

    render() { 

        return (
            <RefreshListView
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

})

export default NearbyListScene
