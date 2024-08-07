import React from "react";
import { FlatList, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import Header from "../../../../Components/header/Header";
import Search from "../../../../Components/Search/Search";
import ScrollViewHelper from "../../../../Components/ScrollViewHelper/ScrollViewHelper";
import CustomText from "../../../../Components/Text";
import CustomCards from "../../../../Components/Cards/CustomCards";
import { Chip, useTheme } from "react-native-paper";
import { responsiveHeight } from "../../../../thems";
import GolbalStyle from "../../../../Style";

const HomeTab = () => {
    const theme = useTheme()

    const colorSchem = useColorScheme()
    const [selectedCategory, setSelectedCategory] = React.useState(new Set())

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: theme.colors.background,
        },
        button: {
            marginTop: 20,
        },

    });
    const resentRead = [
        {
            name: "Modern Physics",
            description: "Writen by: Gefre archentory",
            rating: '4.5'

        },
        {
            name: "NCRT MATH",
            description: "Writen by: Gefre archentory",
            rating: '4.5',
            
        },
        {
            name: "WBSE HISTORY",
            description: "Writen by: Gefre archentory",
            rating: '4.5'
        },
        {
            name: "QUANTUM PHYSICS",
            description: "Writen by: Gefre archentory",
            rating: '4.5',
           
        }
    ]

    const onCategoryAdd = (item) => {
        const newSelectedCategory = new Set(selectedCategory);
        if (newSelectedCategory.has(item)) {
            newSelectedCategory.delete(item);
        } else {
            newSelectedCategory.add(item);
        }
        setSelectedCategory(newSelectedCategory);
    }

    return (

        <View style={styles.container}>
            <Header isHome={true} title={"Welcome ,Sk Jasimuddin"}/>

            <Search />

            <ScrollViewHelper>

            {/* <View style={{height:800}}> */}
           
                {/* Continue Watching */}
                <View style={{ height: responsiveHeight + 200 }}>
                    <CustomText text={'Continue Reading'} size={'lg'} fontWeight={'bold'} />

                    <ScrollView contentContainerStyle={[GolbalStyle.mtSM, { rowGap: 10 }]}>


                        {
                            resentRead.map((item, index) => (
                                <CustomCards key={index} isLoading={item.isLoading ? item.isLoading : false} name={item.name} description={item.description} rating={item.rating} />

                            ))
                        }



                    </ScrollView>
                </View>

                {/*  Category */}
                <View style={[GolbalStyle.mtMD, GolbalStyle.row_space_between]}>
                    <CustomText text={'Categories'} size={'lg'} fontWeight={'bold'} />
                    <CustomText text={'See All'} size={'sm'} underline={true} />
                </View>

                {/* Chip */}


                <View style={[GolbalStyle.mtSM,]}>
                    <FlatList

                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        contentContainerStyle={[GolbalStyle.row_space_between]}
                        data={["UPSC", "SSC", "NEET", "CAT","JAM","JEE MAIN","JEXPO","JELET","DIPLOMA"]}
                        renderItem={({ item }) => {
                            return (
                                <Chip selectedColor={theme.colors.primary} selected={selectedCategory.has(item)} style={[GolbalStyle.chip, { backgroundColor: theme.colors.background  }]}  onPress={() => onCategoryAdd(item)}>{item}</Chip>
                            )
                        }}
                    />
                </View>
                {/* Sugisted BOOK */}

                <View style={[GolbalStyle.mtMD]}>
                    <CustomText text={'Suggestions for You'} size={'lg'} fontWeight={'bold'} />

                    <FlatList
                        contentContainerStyle={[GolbalStyle.mtMD, GolbalStyle.row_space_between]}
                        horizontal={true}
                        data={resentRead}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <CustomCards key={index} horizontal={false} isLoading={item.isLoading ? item.isLoading : false} name={item.name} description={item.description} rating={item.rating} />

                            )
                        }}

                    />

                </View>


                {/* TOP BOOK */}

                <View style={[GolbalStyle.mtMD]}>
                    <CustomText text={'Top Book'} size={'lg'} fontWeight={'bold'} />

                    <FlatList
                        contentContainerStyle={[GolbalStyle.mtMD, GolbalStyle.row_space_between]}
                        horizontal={true}
                        data={resentRead}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <CustomCards key={index} horizontal={false} isLoading={item.isLoading ? item.isLoading : false} name={item.name} description={item.description} rating={item.rating} />

                            )
                        }}

                    />

                </View>
            </ScrollViewHelper>







        </View>
    )

}

export default HomeTab