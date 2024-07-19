import { FlatList, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import Header from '../../../../Components/header/Header'
import GolbalStyle from '../../../../Style'
import CustomText from '../../../../Components/Text'
import { Avatar, Chip, Surface, useTheme } from 'react-native-paper'
import ScrollViewHelper from '../../../../Components/ScrollViewHelper/ScrollViewHelper'
import { darkTheme, lightTheme, responsiveHeight, responsiveWidth } from '../../../../thems'
import { useRoute } from '@react-navigation/native'
import useNavigationHelper from '../../../helper/NavigationHelper'
import { SCREEN_COMPONENT, SCREEN_NAME } from '../../../../Constant'

const BookTab = ({ navigation }) => {
  const route = useRoute()

  const data = route?.params?.data
 const navigate = useNavigationHelper()
  console.log('data', data)
  const theme = useTheme()
  const coloerSchime = useColorScheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
    },
    surface: {
      height: 'auto',
      alignItems: 'center',
      flexDirection: 'row',
      columnGap: responsiveWidth / 5,
      borderRadius: responsiveWidth / 6,
      padding: responsiveWidth / 10,
      backgroundColor: theme.colors.background,
      borderColor: coloerSchime == 'dark' ? lightTheme.colors.background : darkTheme.colors.background,
      borderWidth: 1,

    }
  })
  const [selectedCategory, setSelectedCategory] = React.useState('')
  const classOfStudy = [
    {
      name: "CLASS I",
      description: 'is book is under the board of WBBSE',
      code: 'I',
      bookCategory:[
        {
          name: "English",
          description: "Writen by: Gefre archentory",
          code: 'En',
          bookCategory:[
            {
              name: "Greetings and Introductions",
              description: "Introduces basic greetings like hello, goodbye, thank you, and teaches students how to introduce themselves.",
              code: 'WB1-Eng' // Replace with appropriate WBBSE subject code (Eng - English),
              ,
              type:"pdf"
            },
            {
              name: "The Alphabet",
              description: "Introduces students to the letters of the alphabet, both uppercase and lowercase.",
              code: 'WB1-Eng'
            },
            {
              name: "Phonics",
              description: "Introduces basic phonics sounds and how they relate to letters.",
              code: 'WB1-Eng'
            },
            {
              name: "Simple Vocabulary",
              description: "Introduces common words related to everyday objects, family, and animals.",
              code: 'WB1-Eng'
            },
            {
              name: "Numbers (Words)",
              description: "Introduces students to writing numbers in words (one to ten).",
              code: 'WB1-Eng'
            },
            {
              name: "Colors",
              description: "Introduces students to basic colors through pictures and words.",
              code: 'WB1-Eng'
            },
            {
              name: "Simple Stories and Rhymes",
              description: "Introduces students to simple stories with pictures and short, catchy rhymes.",
              code: 'WB1-Eng'
            }
          ]
          

      },
      {
          name: "MATH",
          description: "Writen by: Gefre archentory",
          code: 'M',
          
      },
      {
          name: "HISTORY",
          description: "Writen by: Gefre archentory",
          code: 'H'
      },
      {
          name: "PHYSICS",
          description: "Writen by: Gefre archentory",
          code: 'PHY',
         
      }
      ]
    },
    {
      name: "CLASS II",
      description: 'is book is under the board of WBBSE',
      code: 'II'
    },
    {
      name: "CLASS III",
      description: 'is book is under the board of WBBSE',
      code: 'III'
    },
    {
      name: "CLASS IV",
      description: 'is book is under the board of WBBSE',
      code: 'IV'
    },
    {
      name: "CLASS V",
      description: 'is book is under the board of WBBSE',
      code: 'V'
    },
    {
      name: "CLASS VI",
      description: 'is book is under the board of WBBSE',
      code: 'V'
    },
    {
      name: "CLASS VII",
      description: 'is book is under the board of WBBSE',
      code: 'VI'
    },
    {
      name: "CLASS VIII",
      description: 'is book is under the board of WBBSE',
      code: 'VII'
    },
    {
      name: "CLASS IX",
      description: 'is book is under the board of WBBSE',
      code: 'VIII'


    },
    {
      name: "CLASS X",
      description: 'is book is under the board of WBBSE',
      code: 'IX'

    },
    {
      name: "NEET",
      description: 'is book is under the board of WBBSE',
      code: 'NET'

    },
    {
      name: "CAT",
      description: 'is book is under the board of WBBSE',
      code: 'CAT'

    },
    {
      name: "JEE MAIN",
      description: 'is book is under the board of WBBSE',
      code: 'JEE'

    }

  ]
const [listData,setListData] = React.useState([])
  
  const onCategoryAdd = (item) => {

    setSelectedCategory(item)
    // const newSelectedCategory = new Set(selectedCategory);
    // if (newSelectedCategory.has(item)) {
    //   newSelectedCategory.delete(item);
    // } else {
    //   newSelectedCategory.add(item);
    // }
    // setSelectedCategory(newSelectedCategory);
  }

  const board = ["WBSSE", "CBSE", "NCRT",
    "ICSE", // Council for the Indian School Certificate Examinations
    "NIOS",  // National Institute of Open Schooling
    "State Boards"]

  
    React.useEffect(()=>{
      setListData(data?.item?.length > 0 ? data?.item :data?.item ?[]:  classOfStudy)
    },[data?.item])

  return (
    <View style={styles.container}>
      <Header isBack={data?.isBack} title={data?.title ? data?.title : "Please Selecet an Category You want to Read"} />
      {/*  Category */}
      <View style={[GolbalStyle.mtMD, GolbalStyle.row_space_between]}>
        <CustomText text={data?.title ? data?.title : 'Exam Board'} size={'lg'} fontWeight={'bold'} underline={true}/>
      </View>

      {/* Chip */}
{

!data?.isBack &&
<View style={[GolbalStyle.mtSM,]}>
<FlatList

  showsHorizontalScrollIndicator={false}
  horizontal={true}
  contentContainerStyle={[GolbalStyle.row_space_between]}
  data={board}
  renderItem={({ item }) => {
    return (
      <Chip selected={selectedCategory == item} style={[GolbalStyle.chip, { backgroundColor: theme.colors.background }]} onPress={() => onCategoryAdd(item)}>{item}</Chip>
    )
  }}
/>
</View>
}

     

      {/*  Class */}
      <View style={[GolbalStyle.mtMD, GolbalStyle.scroll]}>

{console.log('data?.item', listData)}
        <FlatList
          contentContainerStyle={[GolbalStyle.row, { backgroundColor: theme.colors.background, paddingHorizontal: 5 }]}
          data={listData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity style={styles.surface} activeOpacity={0.7} onPress={()=>{

                  if(item?.bookCategory?.length > 0){
navigate.push({screen:SCREEN_NAME.BookTab,data:{item:item?.bookCategory,title:item?.name,isBack:true}})

                  }else{
                     switch(item?.type){
                      case "pdf":
                        navigate.push({screen:SCREEN_NAME.PdfViewer,data:item?.link})
                     }
                  }
                }}>
                  <Avatar.Text color={coloerSchime != 'dark' ? lightTheme.colors.background : darkTheme.colors.background} style={{ backgroundColor: theme.colors.primary }} size={responsiveHeight / 1.4} label={item?.code?.slice(0,2)} />
                  <View >
                    <CustomText  text={item.name} bold={'bold'} size={"md"} spacing={0} />
                    <CustomText   text={item?.description?.slice(0,30) +"..."} size={'sm'} fontWeight={"bold"} spacing={0} />

                  </View>
                </TouchableOpacity>
              </>
            )
          }}

        />

      </View>
    </View>
  )
}

export default BookTab

