//CONTEXTO RESPONSAVEL PELA AUTENTICAÇÃO
import { useState, createContext } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//Criando o contexto

export const AuthContext = createContext({}); //Inicializando como objetvo vazio

export default function AuthProvider({ children }){

    //transformando em um controlador para o signed onde mais para frente será transformado em boolean por !!user
    const [ user, setUser ] = useState(null);

    async function signUp(email, password, name){
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
            })
        })
        .catch( error => console.log(error));
    }

    return( 

        <AuthContext.Provider value={{ signed: !!user, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

