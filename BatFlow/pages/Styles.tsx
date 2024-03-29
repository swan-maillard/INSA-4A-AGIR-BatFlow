import {StyleSheet} from 'react-native';

const primary = "#fc003b";
const secondary = "#a90028";
const black = "#232121";

const pink= "#F5577C";
const lightpink= "#FFC0CF";
const lightgrey= "#F3F3F3";
const textgrey= "#66676F";
const white = "#fff";
const grey = "#e8e8e8";
const lightText = "#66676F";

const colors = {
    primary,
    secondary,
    black,
    white,
    grey
}

// @ts-ignore
const styles = StyleSheet.create({
    body: {
        width: "100%",
        height: "100%",
        backgroundColor: primary,
        color: white,
        fontSize: "18px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative"
    },
    mainContainer: {
        position: 'relative',
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: white,
    },
    highlight: {
      fontWeight: '500',
      color: primary
    },
    pageTitle: {
      fontWeight: '700',
      color: primary
    },
    periodDurationContainer:{
        backgroundColor: lightpink,
        borderRadius: 30,
        padding:25,
        width:'100%',
        color: white
    },
statsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
},
samanthaStatsContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'space-between',
},
    scoreContainer: {
      backgroundColor: "#F0F0F0E5",
      borderRadius: 30,
      padding: 25,
      width: '47%',
      color: 'textgrey'
},
    samanthaScoreContainer: {
      backgroundColor: pink,
      borderRadius: 15,
      padding: 20,
      width: '45%',
      color: 'white'
},
    boldText: {
      fontWeight: '700',
      color: black
    },
    textDurationStat:{
      fontWeight: '700',
      color: white,
      fontSize: 20
    },
    descriptionStat:{
      fontWeight: '700',
      color: textgrey,
      fontSize: 15,
        textAlign: 'center'
    },

    samanthaDescriptionStat:{
      fontWeight: '800',
      color: white,
      fontSize: 14
      },
    scoreValue:{
      fontWeight: 'bold', // Pour le texte en gras
      fontSize: 20,
      color: 'white', // Pour la couleur blanche
      textAlign: 'right' // Pour aligner le texte à droite
    },
    durationStat:{
        fontWeight: '800',
        color: white,
        lineHeight: 42,
        fontSize: 40
    },
    bold: {
        fontWeight: '700',
    },
    light: {
        color: lightText,
    },
    input: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 12,
      paddingTop: 12,
      borderRadius: 30,
      backgroundColor: colors.black,
      width: "100%",
      color: colors.white
    },
    button: {
      padding: 15,
      borderRadius: 30,
      outline: "none",
      border: "none",
      textTransform: "uppercase",
      cursor: "pointer",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    logo: {
        width: 50,
        height: 50
    },
    bottomWave: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "black"
    }
});

export default styles;
export {colors};
