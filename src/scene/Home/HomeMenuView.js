import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native'
import PageControl from 'react-native-page-control'
import HomeMenuItem from './HomeMenuItem'
import Screen from '../../common/Screen'
import color from '../../widget/color'

type Props = {
    menuInfos: Array<Object>,
    onMenuSelected: Function,
}

type State = {
    currentPage: number,
}

class HomeMenuView extends PureComponent<Props, State> {

    constructor(props: Object) {
        super(props)

        this.state = {
            currentPage: 0,
        }
    }

    onScroll = (e) => {
        let x = e.nativeEvent.contentOffset.x
        let currentPage = Math.round(x / Screen.width)

        // alert('currentPage ' + currentPage)
        if(this.state.currentPage != currentPage) {
            this.setState({currentPage: currentPage})
        }        
    }

    render() {
        let {menuInfos, onMenuSelected} = this.props

        let pageCount = Math.ceil(menuInfos.length / 10)

        let menuElements = menuInfos.map((info, index) => (
            <HomeMenuItem
                key={index}
                title={info.title}
                icon={info.icon}
                onPress={() => {
                    onMenuSelected(index)
                }}
            />
        ))

        let menuViews = []
        
        for (let i=0; i<pageCount; i++) {
            let elementsPerPage = menuElements.slice(i * 10, i * 10 + 10)

            let menuView = (
                <View key={i} style={styles.itemsView}>
                    {elementsPerPage}
                </View>
            )
            menuViews.push(menuView)
        }

        return (
           <View style={styles.container}>
               <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={200}
                    onScroll={this.onScroll}
               >
                   {menuViews}
               </ScrollView>
               <PageControl
                    style={styles.pageControl}
                    numberOfPages={pageCount}
                    currentPage={this.state.currentPage}
                    pageIndicatorTintColor='gray'
                    currentPageIndicatorTintColor={color.primary}
               />
           </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    itemsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Screen.width,
    },
    pageControl: {
        margin: 10,
    }
})

export default HomeMenuView
