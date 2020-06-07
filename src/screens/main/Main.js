import * as React from 'react';
import {useState} from 'react';
import { View,Text, StyleSheet,ImageBackground,TouchableOpacity, FlatList, SafeAreaView, StatusBar  } from 'react-native';
import { AsyncStorage } from 'react-native';
import { useEffect } from 'react';
import bgFile from '../../assets/background2.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import { Divider } from 'react-native-elements';

export default function HomeScreen(props) {
  const [runOnce,setRunOnce] = useState(true);

  const DATA = [0,1,2,3,4,5,6,7,8,9,10];

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('DidFirstSteps');
      if (value === null || value === false) {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Main' },
          ],}));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    /*if(runOnce) {
      _retrieveData();
      setRunOnce(false);
    }*/
  },[]);

  function doNothing() {
    return null
  }

  /*function Item({ id, title, selected, onSelect }) {
    return (

    );
  }*/
  

  return (
      <ImageBackground source={bgFile} style={styles.bgimage}>
        <StatusBar barStyle="light-content" backgroundColor="#002033" />
        <View style={styles.container}>
          <View style={styles.containerItemTop}>
            <Text style={styles.textTop}>Coeficiente Base: 80.4</Text>
            <View style={styles.boxTop}>
              <Text style={styles.textBoxTop}>Coeficiente Simulado</Text>
              <Text style={styles.textCoef}>83.2</Text>
            </View>
          </View>
          <SafeAreaView style={styles.containerItemMid}>
            <Text style={styles.textDisc}>Disciplinas Cadastradas</Text>
            <Divider style={styles.div1} />
            <FlatList
              data={DATA}
              style={styles.scrollView}
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => (
                <View key={item} style={styles.listContainer}>
                  <View key={item} style={styles.listItem}>
                    <View>
                      <View style={styles.boxDiscCoef}>
                        <Text style={styles.discCoef}>{10-item}.0</Text>
                      </View>
                    </View>
                    <View style={styles.boxDiscMain}>
                      <Text style={styles.textDiscName}>Disciplina {item}</Text>
                      <Text style={styles.textDiscCh}>Carga Horaria: {item*10}h</Text>
                    </View>
                    <View>
                      <TouchableOpacity style={styles.actionList} onPress={() => doNothing(id)}>
                        <Icon3 name="options" style={styles.actionlistIcon} size={14}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Divider style={styles.div2} />
                </View>
              )}
              keyExtractor={item => item}
            />
          </SafeAreaView >
          <View style={styles.containerItemBottom}>
            <TouchableOpacity style={styles.menuButton} onPress={() => doNothing()}>
              <Icon2 name="info" style={styles.iconButton} size={30}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={() => doNothing()}>
              <Icon name="add" style={styles.iconButton} size={45}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton} onPress={() => doNothing()}>
              <Icon name="settings" style={styles.iconButton} size={30}/>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
},
containerItemTop: {
  width: '100%',
  marginTop: 10,
  alignItems: 'center'
},
scrollView: {
  marginBottom: 15,
  width: '100%',
},
listItem: {
  paddingLeft: 10,
  paddingRight: 5,
  paddingTop: 10,
  paddingBottom: 10,
  flexDirection: 'row',
  width: '95%',
  alignItems: 'center',
},
boxDiscMain: {
  flex: 1,
  flexBasis: 0,
  flexGrow: 1,
  marginLeft: 10,
  marginRight: 10,
  //alignItems: 'center',
},
listContainer: {
  width: '100%',
},
boxDiscCoef: {
  backgroundColor: '#004772',
  borderRadius: 15, 
  width: 50,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
},
discCoef: {
  fontSize: 22,
  marginBottom: 2,
  color: '#FFFFFF',
},
actionList: {
  borderWidth: 1,
  borderColor: 'rgba(	0, 71, 114,0.5)',
  borderRadius: 8,
  width: 30,
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
},
actionlistIcon: {
  color: '#004772',
},
containerItemMid: {
  width: '95%',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderWidth: 1,
  flex: 1,
  flexBasis: 0,
  flexGrow: 1,
  borderColor: 'rgba(0, 71, 114, 0.2)',
  borderRadius: 20,
  flexWrap: 'wrap',
  marginTop: 10,
  marginBottom: 10,
  alignItems: 'center',
  shadowColor: "#000",
  shadowOpacity: 1,
  shadowRadius: 13.16,
  elevation: 1,
},
containerItemBottom: {
  flexDirection: 'row',
  width: '100%',
  justifyContent:'space-evenly',
  alignItems:'center',
  marginBottom: 10,
},
div1: {
  backgroundColor: 'rgba(0,0,0,0.4)',
  width: '100%',
  textAlign: 'center',
},
div2: {
  backgroundColor: 'rgba(0,0,0,0.2)',
  width: '100%',
  textAlign: 'center',
},
textDisc: {
    fontSize: 15,
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#242424'
},
textDiscName: {
  fontSize: 20,
  color: '#004772',
  fontWeight: 'bold',
  //textAlign: 'center'
},
textDiscCh: {
  fontSize: 14,
  color: '#004772',
},
instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
},
bgimage: {
  flex: 1,
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},
boxTop: {
  borderRadius: 20,
  width: '95%',
  padding: 15,
  marginTop: 5,
  alignItems: 'center',
  borderWidth: 1,
  backgroundColor: '#002f4b',
  borderColor: 'rgba(0,0,0,0.3)',
},
textBoxTop: {
  color: '#ffffff',
  fontSize: 20,
},
textCoef: {
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: 25,
},
textTop: {
  fontSize: 15, 
  color: '#ffffff',
  fontWeight: 'bold'
},
addButton: {
  borderRadius: 45,
  width: 75,
  height: 75,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.1)',
  backgroundColor: '#003758',
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.51,
  shadowRadius: 13.16,
  elevation: 20,
},
menuButton: {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.51,
  shadowRadius: 13.16,
  elevation: 20,
},
iconButton: {
  color: '#ffffff'
}
});