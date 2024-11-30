import React, { FC, useEffect } from "react";
import { View,Text,StyleSheet } from "react-native";
import { ReplyProviderContext } from "../context/replyContext";

interface Props {
  reply: string | false;
}

const ReplyPopup: FC = () => {

    const {reply,setReply}=ReplyProviderContext();

    useEffect(()=>{
        if(reply){
            setTimeout(() => {
                setReply(false);
            }, 3000);
        }
    },[])

  if (reply) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{reply}</Text>
      </View>
    );
  }
};

export default ReplyPopup;


const styles = StyleSheet.create({

    container:{
        position: "absolute",
        top: 150,
        right: 100,
        width: 150,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        textTransform:"capitalize",
    }
    ,text:{
        color: "black",
        lineHeight:40,
        fontSize: 18
    }

});




/**
 * 
    
 */