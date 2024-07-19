import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';
import Header from '../../Components/header/Header';
import { responsiveWidth } from '../../thems';
import { useTheme } from 'react-native-paper';

const PdfViewer = () => {
    const theme = useTheme()
    const source = { uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf', cache: true };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal:responsiveWidth/6,
            backgroundColor:theme.colors.background
           
           
        },
        pdf: {
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }
    });

    return (
        <> 
            <View style={styles.container}>
            <Header title={'Reading'} isBack={true} />

                <Pdf
                    trustAllCerts={false}

                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf} />
            </View>
        </>
    )
}

export default PdfViewer

