import React, { Component } from 'react';

import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native';

import AnimateLoadingButton from 'react-native-animate-loading-button';

const url = "https://gugale.com.br/capello/public/api/v1/";

class ButtonLike extends Component {

    constructor(props) {

        super(props);

        this.state = {
            like:this.props.projectlike
        };

        //console.log(this.props);
    }


    _onPressHandler() {

        this.loadingButton.showLoading(true);
        
        this.like()
  
    }

    like(){


        if(this.state.like){

            this.setState({like:false})

        }
        else{

            this.setState({like:true})

        }
            
        return fetch(url + 'projects/like/'+ this.props.project_id +'/'+ this.props.user_id)
        .then((response) => response.json())
        .then((responseJson) => {

            this.loadingButton.showLoading(false);

        })
        .catch((error) => {
            this.loadingButton.showLoading(false);
        });
        
    }

    render() {

        if (this.state.like) {

            return (
                <View style={{marginTop:10}}>

                

                 <AnimateLoadingButton
                                ref={c => (this.loadingButton = c)}
                                width={300}
                                height={40}
                                title="Desfazer"
                                borderRadius={30}
                                titleFontSize={16}
                                titleColor="rgb(255,255,255)"
                                backgroundColor="#FFD700"
                                
                                onPress={this._onPressHandler.bind(this)}
                            />

                 </View>
            );

        }
        return (
            <View style={{marginTop:10}}>

            <AnimateLoadingButton
                                ref={c => (this.loadingButton = c)}
                                width={300}
                                height={40}
                                title="Curtir"
                                borderRadius={30}
                                titleFontSize={16}
                                titleColor="rgb(255,255,255)"
                                backgroundColor="#1E90FF"
                                onPress={this._onPressHandler.bind(this)}
                            />

             </View>
        );

    }

}


export default ButtonLike;