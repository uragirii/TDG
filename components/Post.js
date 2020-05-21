import React, { Component } from 'react'
import { Card, Subheading, Caption } from 'react-native-paper'

export class Post extends Component {
    render() {
        return (
            <Card 
                elevation={12}
                style={{
                    borderRadius:10, 
                    paddingBottom:"5%", 
                    paddingTop:"5%", 
                    backgroundColor:"#22365d", 
                    paddingHorizontal:"5%",
                    marginVertical:"2%",
                    marginHorizontal:"5%"
                }}
            >
                <Subheading style={{fontSize:17, fontWeight:"bold", color:"#FFF"}}>{this.props.title}</Subheading>
                <Caption style={{color:"#BBB", paddingTop:"2%"}}>{this.props.body}</Caption>
            </Card>
        )
    }
}

export default Post
