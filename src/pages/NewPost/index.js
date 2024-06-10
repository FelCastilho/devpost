import { useState, useLayoutEffect, useContext } from "react";

import { Container, Button, ButtonText, Input } from "./style";

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

function NewPost(){

    const { user } = useContext(AuthContext);

    const navigation = useNavigation();
    const [post, setPost] = useState("");

    //A interface só vai ser montada quando tudo aqui dentro carregar
    useLayoutEffect(() => {
        navigation.setOptions({
            //Adicionar o botão de Compartilhar
            headerRight: () => (
                <Button onPress={() => handlePost()}>
                    <ButtonText>Compartilhar</ButtonText>
                </Button>
            ),
        });
    }, [navigation, post]);

    async function handlePost(){
        if(post === ''){
            alert("O post não pode ficar vazio");
            return;
        }

        //Pegando foto de perfil

        let avatarUrl = null;

        try{
            let response = await storage().ref('users').child().child(user?.uid).getDownloadURL();

            avatarUrl = response;

        }catch(err){
            avatarUrl = null;
        }

        await firestore().collection('posts')
        .add({
            created: new Date(),
            content: post,
            autor: user?.nome,
            userId: user?.uid,
            likes: 0,
            avatarUrl,
        })
        .then( () => {
            setPost('');
        })
        .catch((err) => {
            console.log(err)
        })

        navigation.goBack();
    }

    return(
        <Container>
            <Input
                placeholder="O que está acontecendo?"
                value={post}
                onChangeText={(text) => setPost(text)}
                autoCorrect={false}
                multiline={true}
                placeholderTextColor="#ddd"
                maxLength={300}
            />
        </Container>
    )
}

export default NewPost;