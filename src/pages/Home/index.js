import React from "react";
import { View, Text } from "react-native";

import { Container, ButtonPost } from "./style";

import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather';

function Home(){

    const navigation = useNavigation();

    return(
        <Container>
            <Text>Tela home</Text>

            <ButtonPost 
            activeOpacity={0.8}
            onPress={() => navigation.navigate("NewPost")}
            >
                <Feather
                    name="edit-2"
                    color="#fff"
                    size={25}
                />
            </ButtonPost>
        </Container>
    )
}

export default Home;