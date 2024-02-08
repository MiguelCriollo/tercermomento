import { CardProps, H3, H4, H5, H6, Text } from "tamagui";
import { Button, Card, H2, Image, Paragraph, XStack } from 'tamagui';
import { Subtitle } from "~/tamagui.config";
import { Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import EditModal from "~/app/components/EditModal";
import { deleteFilm } from "~/app/service/BasicPetitions";
interface BasicCardsProps {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Array<FetchResponses>;
  pageChange: (newPage:Array<FetchResponses>) => void;
  header: string;
  changeHeader: (newHeader: string) => void;
}

interface DemoCardsProps {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: FetchResponses;
  pageChange: (newPage:Array<FetchResponses>) => void;
  header: string;
  changeHeader: (newHeader: string) => void;
}
export function BasicCards({setShowEditModal, data, pageChange, header ,changeHeader}:BasicCardsProps) {
console.log("Edit Modal=>",data);
  return (
    <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" space>
      {data.map((value,index)=>{
        return(<DemoCard key={index} data={value}
          setShowEditModal={setShowEditModal} pageChange={pageChange} header={header} changeHeader={changeHeader}
        />)
      })}
    </XStack>
  );
}
export function DemoCard({setShowEditModal, data, pageChange, header, changeHeader}:DemoCardsProps) {
  const [form,setForm]=useState({})
  const [formModel, setFormModel]=useState<string[]>([])

  console.log("Data:",data)
  const handleDelete=(id:number)=>{
    deleteFilm(header,id)
  }

  const editModal=()=>{
    setShowEditModal(true);
  }

  const changeNewPage=()=>{

    let newHeader=header==="film"?"scene":"character";

    changeHeader(newHeader)
    pageChange((data as any)[newHeader]);
  }

  function createForm(){
    console.log("Data ---->",data)
    setForm({})
    setFormModel([])
    const keys = Object.keys(data);

    for (const key of keys) {
      if(key=="0"||key==="id"||key==="key"||key==="character"||key==="scene"){continue}
      setForm((prev)=>{return { ...prev, [key]: "" };})
      setFormModel((prev)=>{return [...prev, key]})
    }
    console.log("Form=>",keys)
    console.log("Form Model=>",formModel)
  }

  useEffect(() => {
    createForm()
  }, [data]);
  return (
    <Card elevate size="$4" bordered={5}  borderColor={'white'}
          animation="bouncy"
          width={"100%"}
          height={'auto'}
          scale={0.9}
          hoverStyle={{ scale: 0.925 }}
          pressStyle={{ scale: 0.875 }}
          onPress={()=>{
            changeNewPage()
          }}
    >
      <Card.Header padded>
        {formModel.map((value,index)=>{
          // console.log("Data++++++",data)
          // console.log("Value++++++",value)
          return (<H5>{value}: {(data as any)[value]} </H5>)
        })}
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Pressable
          style={{ marginHorizontal: 5 }}
          onPress={() => {
            editModal();
          }}>
          <Image source={require('../../assets/EditIcon.png')} />
        </Pressable>
        <Pressable
          style={{ marginHorizontal: 5 }}
          onPress={() => {
            handleDelete(data.id)
          }}>
          <Image source={require('../../assets/DeleteIcon.png')} />
        </Pressable>
      </Card.Footer>

      <Card.Background backgroundColor='#570838' borderRadius={5}>
      </Card.Background>

    </Card>
  );
}
