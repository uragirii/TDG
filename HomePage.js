import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator } from 'react-native'

const footer = ()=>{
    return (
        <View>
            <ActivityIndicator animating size="small"/>
        </View>
    )
}

export class HomePage extends Component {
    state = {
        loading : true,
        allPosts : [],
        postPerPage : 10,     // Customize your prefrence
        curr : 0,
        error: "",
        loadingMore:false
    }
    componentDidMount(){
        // Call the API here. As this API does not support lazy loading of 
        // elements in group of 10. Load 100, and then recall the API
        // as user scrolls through 100
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(res =>{
                // Contains API response
                // For complex Data handling, Redux can also be used 
                this.setState({
                    allPosts: res.slice(0,10),
                    error : "",
                    loading:false
                })
            })
    }
    getMoredata(){
        this.setState({loadingMore:true})
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(res =>{
                // Contains API response
                // For complex Data handling, Redux can also be used 
                // if the data gets too large, crop upper data
                this.setState({
                    allPosts: posts.concat(res.slice(0,10)),
                    error : "",
                    loadingMore:false
                })
            })
    }
    renderFooter = () =>{
        return (
            <View>
                <Text>Loading More</Text><ActivityIndicator animating />
            </View>
        )
    }
    render() {
        if (this.state.loading){
            return (
                <View>
                    <Text>Loading Posts</Text>
                </View>
            )
        }
        return (
            <View style={{marginBottom:"10%"}}>
                <Text>Posts</Text>
                <FlatList
                    data = {this.state.allPosts}
                    initialNumToRender={10}
                    keyExtractor={(item, index)=>index}
                    onEndReachedThreshold={0.7}
                    onEndReached={()=>{
                        this.getMoredata()
                    }}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    ListFooterComponentStyle={{  padding:"5%"}}
                    renderItem={({item, index})=>{
                        return (
                            <View style={{borderWidth:1, marginVertical:"1%", padding:"3%", borderRadius:2, marginHorizontal:"5%"}}>
                                <Text style={{fontWeight:"bold", textAlign:"center", fontSize:20}}>{`${index} ${item.title}`}</Text>
                                <Text>{item.body}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}

export default HomePage
