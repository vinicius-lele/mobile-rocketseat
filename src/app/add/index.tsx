import { useState } from "react";

import { View, Text, TouchableOpacity, Alert } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router"

import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { linkStorage } from "@/storage/link-storage";

export default function Add(){
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    //const [name, setName] = useState<string>() OU ASSIM
    

    async function handleAdd(){
        try{
            if(!category){
            return Alert.alert("Categoria","Selecione a categoria")
        }
        if(!name.trim()){
            return Alert.alert("Nome","Informe o nome")
        }
        if(!url.trim()){
            return Alert.alert("URL","Informe o link")
        }
       
        await linkStorage.save({ 
            id: new Date().getTime().toString(),
            name,
            url, 
            category,
        })

        setName('');       
        setUrl('');        
        setCategory(''); 
        
        Alert.alert("Sucesso", "O link foi salvo")
        }catch(error){
            Alert.alert("Erro", "Não foi possível salvar o link")
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
                </TouchableOpacity>

                <Text style={styles.title}>Novo</Text>
            </View>

            <Text style={styles.label}>
                Selecione uma categoria
            </Text>
            <Categories onChange={setCategory} selected={category} value={category} />
            <View style={styles.form}>
                <Input placeholder="Nome" 
                    onChangeText={setName} 
                    autoCorrect={false}
                    value={name}
                />
                <Input placeholder="URL" 
                    onChangeText={setUrl} 
                    autoCorrect={false} 
                    autoCapitalize="none"
                    value={url} />
                <Button title="Adicionar" onPress={handleAdd} />
            </View>
        </View>
    )
}