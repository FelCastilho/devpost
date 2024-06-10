//CONTEXTO RESPONSAVEL PELA AUTENTICAÇÃO
import { useState, createContext, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from "@react-native-async-storage/async-storage";

//Criando o contexto

export const AuthContext = createContext({}); //Inicializando como objetvo vazio

export default function AuthProvider({ children }){

    //transformando em um controlador para o signed onde mais para frente será transformado em boolean por !!user
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading] = useState(true);
    const [ loadingAuth, setLoadingAuth ] = useState(false);

    useEffect(() => {

        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('@devapp');

            if(storageUser){
                //Convertendo de volta e adicionando dentro do usuário
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();

    }, [])

    async function signUp(email, password, name){
        setLoadingAuth(true);

        await auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            //Colocando os dados de value em uma variavel
            let uid = value.user.uid;
            await firestore().collection('users')
            .doc(uid).set({
                name: name,
                createdAt: new Date(),
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email
                }
                
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        });
    }

    async function signIn(email, password){
        setLoadingAuth(true);
        await auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {
            //Pegando as informações do user

            let uid = value.user.uid;
            const userProfile = await firestore().collection('users').doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().name,
                email: value.user.email,
            }

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        });
    }

    async function signOut(){
        await auth().signOut();
        await AsyncStorage.clear()
        .then(() => {
            //Deslogando o usuário
            setUser(null);
        })
    }

    async function storageUser(data){
        await AsyncStorage.setItem('@devapp', JSON.stringify(data))
    }

    return( 

        <AuthContext.Provider value={{ signed: !!user, signUp, signIn, signOut, loadingAuth, loading, user }}>
            {children}
        </AuthContext.Provider>
    )
}

