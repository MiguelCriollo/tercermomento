import { Feather } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Button, Image, ScrollView, Text, YStack } from "tamagui";

import { Container, Main, Subtitle, Title } from '../tamagui.config';
import { BasicCards } from "~/app/components/BasicCard";
import EditModal from "~/app/components/EditModal";
import { fetchFilms } from "~/app/service/BasicPetitions";
import axios from "axios";
import { Pressable, View } from "react-native";

export default function Details() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const [showEditModal, setShowEditModal]=useState(false);
  const [isCreateModal, setIsCreateModal]=useState(false);
  const [data, setData]=useState([]);
  const baseUrl = 'http://192.168.1.8:8082';
  const fetchFilms = async (ruta) => {
    const url = `${baseUrl}/${ruta}`;
    const response = await axios.get(url);
    setData(response.data);
    console.log(response.data);
  };
  const saveFilm = async (ruta,form) => {
    const url = `${baseUrl}/${ruta}`;
    console.log(url)
    const response = await axios.post(url,form).catch((error)=>{console.log("Error:")});
    console.log(response?.data);
  };

  const deleteFilm = async (ruta,id) => {
    const url = `${baseUrl}/${ruta}`;
    console.log(url)
    const response = await axios.delete(`${url}/delete/${id}`).catch((error)=>{console.log("Error:")});
    console.log(response?.data);
  };

  useEffect(() => {
    setData([])
    fetchFilms("film");
  }, []);

  const openEditModal=()=>{
    setShowEditModal(true)
  }

  const closeEditModal=()=>{
    setShowEditModal(false)
    setIsCreateModal(false)
  }

  const BackButton = () => (
    <Button
      unstyled
      flexDirection="row"
      backgroundColor="black"
      padding={8}
      borderRadius={15}
      pressStyle={{ opacity: 0.5 }}
      onPress={router.back}
      alignItems={'center'}
      icon={<Feather name="chevron-left" size={16} color="white" />}>
      <Text color="white">Volver</Text>
    </Button>
  );

  return (
    <Container style={{ backgroundColor: '#350A24' }}>
      <Stack.Screen options={{ headerTitleStyle:{color: 'white'},headerStyle:{backgroundColor: '#752D59'}, title: '', headerLeft: () => <BackButton /> }} />

      <Main>
        <YStack>
          <ScrollView>
          <Text color="rgba(255,255,255,0.54)" fontWeight="bold" fontSize={40}>DASHBOARD</Text>
          <Text color='#752D59' fontWeight="bold" fontSize={40}>FILMS</Text>
          <BasicCards data={data} setShowEditModal={openEditModal}></BasicCards>
          </ScrollView>
        </YStack>
        <View style={{position: "absolute",
          bottom: 0,
          right: 0}}>
          <Pressable
            style={{borderWidth: 4, borderRadius: 50, borderColor: 'white'}}
            onPress={() => {
              setIsCreateModal(true)
              openEditModal();
            }}>
            <Image source={require('../assets/AddButton.png')} />
          </Pressable>
        </View>
      </Main>
      {showEditModal&&
        <EditModal data={data} closeEditModal={closeEditModal} isCreate={isCreateModal} saveFilm={saveFilm}/>
      }
    </Container>
  );
}
