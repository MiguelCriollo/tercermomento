import { Feather } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from "react";
import { Button, Text, YStack } from 'tamagui';

import { Container, Main, Subtitle, Title } from '../tamagui.config';
import { CardDemo } from "~/app/components/BasicCard";
import EditModal from "~/app/components/EditModal";

export default function Details() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const [showEditModal, setShowEditModal]=useState(false);
  const [showDeleteModal, setShowDeleteModal]=useState(false);

  const openEditModal=()=>{
    setShowEditModal(true)
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
          <Text color="rgba(255,255,255,0.54)" fontWeight="bold" fontSize={40}>DASHBOARD</Text>
          <Text color='#752D59' fontWeight="bold" fontSize={40}>FILMS</Text>
          <CardDemo setShowEditModal={openEditModal}></CardDemo>
        </YStack>
      </Main>
      {showEditModal&&
        <EditModal></EditModal>
      }
    </Container>
  );
}
