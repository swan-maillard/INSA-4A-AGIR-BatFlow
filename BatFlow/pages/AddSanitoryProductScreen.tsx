import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import styles, {colors} from './Styles';
import TopWave from '../components/TopWave'
import CustomText from '../components/CustomText'
import Header from '../components/Header'
import {CameraOptions, launchCamera} from "react-native-image-picker";
import Svg, {Path} from "react-native-svg";
import NavigationBar from "../components/NavigationBar.tsx";

const AddSanitoryProductScreen = ({navigation}: any) => {

    const [prediction, setPrediction] = useState<string|null>(null)
    const [fileURI, setFileURI] = useState<string|null>(null);
    const [fileBase64, setFileBase64] = useState<string|null>(null)
    

    useEffect(() => {
        if (fileBase64) {
            fetch('https://bfbb-134-214-58-69.ngrok-free.app/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: fileBase64,
                }),
            })
                .then(response => {
                    return (response.ok ? response.json() : null);
                })
                .then(json => {
                    setPrediction(json?.['prediction'] || 'none');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [fileBase64]);

    const handleTakePicture = () => {
        const options: CameraOptions = {
            mediaType: 'photo',
            saveToPhotos: true,
            cameraType: 'back',
            maxHeight: 244,
            maxWidth: 244,
            includeBase64: true,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {
                setPrediction(null);
                setFileURI(response.assets?.[0]?.uri || null);
                setFileBase64(response.assets?.[0].base64 || null);
            }
        });
    };

    const progressSvgPath = (i: number) => {
        if (i === 0)
            return "M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
        else
            return "M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
    }

  // Style custom
  const customStyles = StyleSheet.create({
        container: {
          position: "relative",
          backgroundColor: colors.white,
          height: "100%",
          width: "100%",
          color: colors.black,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 90
        },
      actions: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          width: "90%",
          height: "85%",
          marginTop: "10%"
      },
      progressBar: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          position: "relative"
      },
      line: {
          width: "100%",
          backgroundColor: colors.primary,
          height: 2,
          position: "absolute",
      },
      step: {
          width: 16,
          height: 16,
          backgroundColor: colors.white,
          zIndex: 1,
      },
      })

    return (
      <View style={styles.body}>
        <View style={styles.mainContainer}>
            <Header/>
            <TopWave/>
            <ScrollView contentContainerStyle={{flexGrow: 1}} style={{width: "100%"}}>
                <View style={customStyles.container}>
                    <CustomText style={{color:colors.primary, fontFamily:"FiraSans-Bold", fontSize:22}}>Usage of sanitory product</CustomText>
                    <View style={customStyles.actions}>
                      <Pressable style={{...styles.button, backgroundColor: colors.primary, width: "100%", padding: 20, flexDirection: 'row', gap: 10}} onPress={handleTakePicture}>
                          <View style={{width: '75%'}}>
                              <CustomText style={{...styles.bold, fontSize: 20, color: colors.white}}>Take a picture of the product</CustomText>
                              <CustomText style={{...styles.light, fontSize: 15, color: colors.white}}>To improve accuracy and help future scientific research !</CustomText>
                          </View>
                          <Svg height="45" width="45" viewBox="0 0 16 16">
                              <Path d="m0 0h16v16h-16z" fill="none"/>
                              <Path fill={colors.white} d="m6 8.5c0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2-2 .897-2 2zm9-5.5h-3.5c-.25-1-.5-2-1.5-2h-4c-1 0-1.25 1-1.5 2h-3.5c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1zm-7 9.5c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                          </Svg>
                      </Pressable>

                      {fileURI ?
                          <View style={{width: "100%"}}>
                              {prediction ?
                                  <View>
                                      <View style={{display: "flex", alignItems: "center", marginBottom: 10}}>
                                          {prediction === 'none' ?
                                          <CustomText style={{...styles.bold, textAlign: 'center'}}>We couldn't perform analysis on this picture...</CustomText>
                                              :
                                          <CustomText style={{...styles.bold, textAlign: 'center'}}>Your blood loss seems to be {prediction}.</CustomText>
                                          }
                                          <CustomText style={{textAlign: 'center'}}>Please answer the following questions to ensure the result.</CustomText>
                                      </View>
                                      <Pressable style={{...styles.button, backgroundColor: colors.white, borderColor: colors.primary, borderWidth: 3, width: "100%", flexDirection: 'row', justifyContent: "space-between"}} onPress={() => navigation.navigate('QuestionnairePBAC0')}>
                                          <Svg fill="none" stroke="none" height="40" width="40" viewBox="0 0 24 24"/>
                                          <CustomText style={{color: colors.primary, ...styles.bold}}>Answer the questions</CustomText>
                                          <Svg style={{alignSelf: "flex-end"}} fill="none" stroke={colors.primary} height="40" width="40" viewBox="0 0 24 24" strokeLinecap="round" strokeWidth="1.5">
                                              <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002"/>
                                          </Svg>
                                      </Pressable>
                                  </View>
                                  :
                                  <CustomText style={styles.bold}>Wait a moment, your picture is being analyzed...</CustomText>
                              }

                          </View>
                          :
                          <Pressable style={{...styles.button, backgroundColor: "#F0F0F0E5", width: "100%", flexDirection: 'row', justifyContent: "space-between"}} onPress={() => navigation.navigate('QuestionnairePBAC0')}>
                              <Svg fill="none" stroke="none" height="40" width="40" viewBox="0 0 24 24"/>
                              <CustomText>I don't want to take a picture.</CustomText>
                              <Svg style={{alignSelf: "flex-end"}} fill="none" stroke={colors.black} height="40" width="40" viewBox="0 0 24 24" strokeLinecap="round" strokeWidth="1.5">
                                  <Path d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002"/>
                              </Svg>
                          </Pressable>
                      }

                      <View style={customStyles.progressBar}>
                          <View style={customStyles.line}></View>
                          {[...Array(5)].map((x, i) =>
                              <Svg key={'step'+i} style={customStyles.step} fill={colors.primary} viewBox="0 0 512 512">
                                  <Path d={progressSvgPath(i)}/>
                              </Svg>
                          )}
                      </View>
                  </View>
                </View>
            </ScrollView>
            <NavigationBar />
        </View>
      </View>
    );
};

export default AddSanitoryProductScreen;
