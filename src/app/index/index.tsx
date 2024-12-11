import { useState, useEffect } from "react"
import { View, Image, TouchableOpacity, FlatList, Modal, Text, Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { styles } from "./styles"
import { colors } from "@/styles/colors"

import { Link } from "@/components/link"
import { Categories } from "@/components/categories"
import { Option } from "@/components/option"
import { router } from "expo-router"
import { categories } from "@/utils/categories"
import { LinkStorage, linkStorage } from "@/storage/link-storage"


export default function Index(){
    const [category,setCategory] = useState(categories[0].name)
    const[links,setLinks] = useState<LinkStorage>([])

    async function getLinks(){
        try{
            const response = await linkStorage.get()
            setLinks(response)
        }
        catch(error){
            Alert.alert("Erro", "Não foi possível listar os links")
        }
    }

    useEffect(() =>{
        getLinks()
    },[category])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("@/assets/logo.png")} style={styles.logo} />
                <TouchableOpacity onPress={() => router.navigate("/add")}>
                    <MaterialIcons name="add" size={32} color={colors.green[300]} />
                </TouchableOpacity>
            </View>
            <Categories onChange={setCategory} selected={category}/>
            

            <FlatList 
                data={links}
                keyExtractor={ item => item.id}
                renderItem={({item}) => (<Link name={item.name} url={item.url} onDetails={() => console.log("Clicou!")} />)}
                style={styles.links}
                contentContainerStyle={styles.linksContent}
                showsVerticalScrollIndicator={false}
            />

            <Modal transparent visible={false}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>Curso</Text>
                            <TouchableOpacity onPress={() => router.navigate("/add")}>
                                <MaterialIcons name="close" size={20} color={colors.gray[400]} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalLinkName}>
                            Rocketseat
                        </Text>
                        <Text style={styles.modalUrl}>
                            https://www.rocketseat.com.br
                        </Text>

                        <View style={styles.modalFooter}>
                            <Option name="Excluir" icon="delete" variant="secondary" />
                            <Option name="Abrir" icon="language" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>)
}
