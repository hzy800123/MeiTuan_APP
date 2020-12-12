import React, { PureComponent } from 'react'
import { StyleSheet, View, Image, Text, InteractionManager } from 'react-native'
import { WebView } from 'react-native-webview'

type Props = {

}

class WebScene extends PureComponent<Props> {

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title
    })

    constructor(props) {
        super(props)
        this.props.navigation.setParams({title: ''})
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({title: '加载中'}) 
        })
    }

    onLoadEnd = (e) => {
        let title = e.nativeEvent.title
        // alert('title ' + title)
        if (title.length > 0) {
            let positionUnderScore = title.indexOf('_')
            let subTitle = ''
            if (positionUnderScore > 0) {
                subTitle = title.substring(0, positionUnderScore)
            } else {
                subTitle = title
            }
            this.props.navigation.setParams({title: subTitle})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    style={styles.webView}
                    source={{uri: this.props.navigation.state.params.url}}
                    onLoadEnd={this.onLoadEnd}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        flex: 1,
    },
})

export default WebScene
