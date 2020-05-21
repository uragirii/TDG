import React, { Component } from 'react'
import {  View, FlatList, SafeAreaView} from 'react-native'
import { Caption, Headline, Subheading, ActivityIndicator } from "react-native-paper";
import { Post } from "./components/Post";

export class HomePage extends Component {
    state = {
        loading : true,
        allPosts : [],
        postPerPage : 10,     // Customize prefrence
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
                    allPosts: res.slice(0,this.state.postPerPage),
                    error : "",
                    loading:false
                })
            })
            .catch(err =>{
                this.setState({
                    loading:false,
                    error: err
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
                    allPosts: this.state.allPosts.concat(res.slice(0,this.state.postPerPage)),
                    error : "",
                    loadingMore:false
                })
            })
            .catch(err=>{
                console.log(err)
                this.setState({
                    loadingMore:false,
                    error:err
                })
            })
    }
    render() {
        if (this.state.loading){
            return (
                    <View style={{flexDirection: "row", justifyContent: "center",height:"100%", backgroundColor:"#081631"}}>
                        <ActivityIndicator size="small" color="#f90024" />
                        <Subheading style={{alignSelf:"center", padding:"5%", color:"white"}}>Loading Posts</Subheading>
                    </View>
            )
        }
        else{
            return (
                <SafeAreaView style={{height:"100%", backgroundColor:"#081631"}} >
                    <FlatList
                        data = {this.state.allPosts}
                        initialNumToRender={10}
                        keyExtractor={(item, index)=>index.toString()}
                        onEndReachedThreshold={0.6}
                        onEndReached={()=>{
                            this.getMoredata()
                        }}
                        ListHeaderComponent={()=>{
                            return (
                            <Headline 
                                style={{
                                    color:"white", 
                                    fontSize:45,
                                    paddingTop:"15%",
                                    margin:"5%",
                                    paddingBottom:"7%"
                                }} 
                                numberOfLines={1} 
                                adjustsFontSizeToFit>Posts</Headline>)
                        }}
                        ListFooterComponent={() =>{
                            if(this.state.error===""){
                                return (
                                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center",marginBottom:"2%", paddingVertical:"5%"}}>
                                        <ActivityIndicator size="small" color="#f90024"/>
                                        <Caption style={{color:"white", padding:"5%"}}>Loading More Posts</Caption>
                                    </View>
                                )
                            }
                            else{
                                return (
                                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center",marginBottom:"2%", paddingVertical:"5%"}}>
                                        <Caption style={{color:"white", padding:"5%"}}>Error Occured while loading</Caption>
                                    </View>
                                )
                            }
                            
                        }}
                        ListFooterComponentStyle={{  padding:"5%"}}
                        renderItem={({item, index})=>{
                            return (
                                <Post
                                    title ={item.title}
                                    body = {item.body}
                                />
                            )
                        }}
                    />
                </SafeAreaView>
            )
        }
    }
}

export default HomePage
