import * as React from 'react';
import {useState} from 'react';
import { View,Text, StyleSheet,ImageBackground,TouchableOpacity, KeyboardAvoidingView, FlatList, 
  SafeAreaView, Modal, StatusBar, TextInput, Alert  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';
import bgFile from '../../assets/background2.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import { Divider } from 'react-native-elements';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { CommonActions } from '@react-navigation/native';
import {Picker} from '@react-native-community/picker';
import { act } from 'react-test-renderer';

export default function Main(props) {
  const [runOnce,setRunOnce] = useState(true);

  const[baseCf,setBaseCf] = useState({
    ch: 0.0,
    nf: 0.0,
  });

  const[simulatedCf,setSimulatedCf] = useState(0);

  const [modalAboutVisible, setModalAboutVisible] = useState(false);
  const [modalConfigVisible, setModalConfigVisible] = useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [refresh,setRefresh] = useState(false);

  const [Data,setData] = useState([]);

  const [isNew,setIsNew] = useState(true);

  const [disc,setDisc] = useState({
    name: '',
    ch: 60,
    cf: 0.0,
  });

  const inputChange = (field, value) => {
    setDisc(state => ({
       ...state,
       [field]: value
    }))
 };


  const _checkFirstSteps = async () => {
    try {
      const value = await AsyncStorage.getItem('@DidFirstSteps');

      if (value === null || value !== "true") {
        return props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Steps' },
          ],}));
      }
    } catch (error) {

    }
  };

  const _retrieveData = async () => {
    try {
      const array1 = await AsyncStorage.getItem('@StoredArray1');

      if (array1 !== null && array1 !== undefined) {
        setData( JSON.parse(array1) );
      }
    } catch (e) {
      
    }
  }

  const _retrieveCoef = async () => {
    try {
      const ch = await AsyncStorage.getItem('@baseCh');
      const nf = await AsyncStorage.getItem('@baseNf');
      const cf = await AsyncStorage.getItem('@baseCf');

      if (ch == null || nf == null || cf == null) {
        return;
      }
      setBaseCf({ch: parseFloat(ch), nf: parseFloat(nf), cf: parseFloat(cf)});
    } catch (e) {
      
    }
  }

  useEffect(() => {
    if(runOnce) {
      _checkFirstSteps();
      _retrieveCoef();
      _retrieveData();
      setRunOnce(false);
    }
    updateCf();
    saveStorageChanges();
    //console.log("Clearou");
    //await AsyncStorage.clear();
  },[JSON.stringify(Data), baseCf]);

  function openFirstSteps() {
    return props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Steps' },
      ],}));
  }

  const updateCf = () => {
    if (Data.length == 0) {
      setSimulatedCf(baseCf.cf);
    } else {
      let sumNf = 0;
      let sumCh = 0;

      Data.map(item => {
        sumNf += parseFloat(item.cf) * parseFloat(item.ch);
        sumCh += parseFloat(item.ch);
      });

      console.log(sumNf, " - ",sumCh);

      try {
        let calc = (sumNf + baseCf.nf) / ( (sumCh + baseCf.ch) * 10)
        let power = Math.pow(10, 4 || 0)
        calc = (Math.round(calc * power) / power);
        setSimulatedCf(calc);
      } catch(e) {
        
      }
    }
  }

  const createTwoButtonAlert = (title,msg,disc) =>
    Alert.alert(
      title,
      msg,
      [
        {
          text: "Cancelar", onPress: () => null,
        },
        { text: "Confirmar", onPress: () => removeDisc(disc) }
      ],
      { cancelable: true }
    );


  function addDisc() {
    setIsNew(true);
    inputChange("id",null);
    inputChange("name","");
    inputChange("ch",60);
    inputChange("cf",0.0);

    setModalAddVisible(true);
  }

  function editDisc(disc) {
    setIsNew(false);
    inputChange("name",disc.name);
    inputChange("ch",disc.ch);
    inputChange("cf",disc.cf);

    setModalAddVisible(true);
  }

  function removeDisc(disc) {
    let newArray = Data.filter(item => item.name.toLowerCase() != disc.name.toLowerCase());
    setData(newArray);
  }

  function fastModify(index, newCf) {
    /*console.log("Index: ",index," - New: ",newCf);
    let newArray = Data;
    newArray[index].cf = newCf;
    setData(newArray);
    console.log("\n",Data,"\n",newArray);*/
  }

  const saveStorageChanges = async () => {
    //console.log("ATUALIZOU: ", Data);
    setRefresh(!refresh);
    try {
      const value = await AsyncStorage.setItem('@StoredArray1',JSON.stringify(Data));
    } catch (error) {

    }
  };

  function refreshListWithModification() {
    // New Disc
    let newArray = Data;
    let isNewIndex = newArray.findIndex(item => item.name.toLowerCase() == disc.name.toLowerCase())
    // New Disc
    if (isNewIndex == -1) {
      newArray.push(disc);
    // Edit Disc
    } else {
      newArray[isNewIndex] = disc;
    }
    setData(newArray);
    setModalAddVisible(false);
  }
  

  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground source={bgFile} style={styles.bgimage}>
        <StatusBar barStyle="light-content" backgroundColor="#002033" />
        <View style={styles.container}>
          <View style={styles.containerItemTop}>
            <Text style={styles.textTop}>Coeficiente Base: {baseCf.cf}</Text>
            <View style={styles.boxTop}>
              <Text style={styles.textBoxTop}>Coeficiente Simulado</Text>
              <Text style={styles.textCoef}>{simulatedCf}</Text>
            </View>
          </View>
          <KeyboardAvoidingView style={styles.containerItemMid}>
            <Text style={styles.textDisc}>Disciplinas Cadastradas</Text>
            <Divider style={styles.div1} />
            <FlatList
              data={Data}
              extraData={refresh}
              removeClippedSubviews={false}
              style={styles.scrollView}
              showsVerticalScrollIndicator={true}
              ListEmptyComponent={<Text style={styles.emptyMsg}>Nenhuma disciplina cadastrada.</Text>}
              renderItem={({ item,index }) => (
                <View style={styles.listContainer}>
                  <View style={styles.listItem}>
                    <View>
                      <View style={styles.boxDiscCoef}>
                        <TextInput style={styles.discCoef} onChangeText={e => item.cf = e} onEndEditing={e => fastModify(index,e.nativeEvent.text)} keyboardType={"numeric"} defaultValue={item.cf.toString()} />
                      </View>
                    </View>
                    <View style={styles.boxDiscMain}>
                      <Text style={styles.textDiscName}>{item.name}</Text>
                      <Text style={styles.textDiscCh}>Carga Horaria: {item.ch}h</Text>
                    </View>
                    <View>
                      <View style={styles.viewTwoButton}>
                      <TouchableOpacity style={styles.actionlistIconBtnLeft} onPress={() => editDisc(item)}>
                        <Icon name="edit" style={styles.actionlistIconEdit} size={16}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionlistIconBtnRight} onPress={() => createTwoButtonAlert("Confirmação",`Deseja remover ${item.name}`,item)}>
                        <Icon name="delete" style={styles.actionlistIconRemove} size={16}/>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <Divider style={styles.div2} />
                </View>
              )}
              keyExtractor={(item) => item.name}
            />
          </KeyboardAvoidingView>
          <HideWithKeyboard style={styles.containerItemBottom}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setModalAboutVisible(true)}>
              <Icon2 name="info" style={styles.iconButton} size={30}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={() => addDisc()}>
              <Icon name="add" style={styles.iconButton} size={45}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton} onPress={() => setModalConfigVisible(true)}>
              <Icon name="settings" style={styles.iconButton} size={30}/>
            </TouchableOpacity>
          </HideWithKeyboard>
        </View>
      </ImageBackground>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalAboutVisible}
          onRequestClose={() => {setModalAboutVisible(false)}}
          >
        <View style={styles.aboutContainer}>
          <View style={styles.aboutModalView}>
          <Text style={styles.textDiscName}>Informações sobre criador e componentes.</Text>
          <TouchableOpacity style={styles.boxTop} onPress={() => setModalAboutVisible(false)}>
            <Text style={styles.textCoef}>Fechar</Text>
          </TouchableOpacity>
          </View>
        </View>
        </Modal>
      
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalConfigVisible}
          onRequestClose={() => {setModalConfigVisible(false)}}
          >
        <View style={styles.aboutContainer}>
          <View style={styles.aboutModalView}>
          <Text style={styles.textDiscName}>Configurações Básicas do APP.</Text>
          <View style={styles.dialogBtnView}>
          <TouchableOpacity style={styles.dialogBtn} onPress={() => openFirstSteps()}>
            <Text style={styles.textCoef}>Ver Tutorial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dialogBtn} onPress={() => setModalConfigVisible(false)}>
            <Text style={styles.textCoef}>Fechar</Text>
          </TouchableOpacity>
          </View>
          </View>
        </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAddVisible}
          onRequestClose={() => {setModalAddVisible(false)}}
          >
        <View style={styles.aboutContainer}>
          <View style={styles.addModalView}>
          <Text style={styles.addModalTitle}>{ isNew ? "Adicionar" : "Editar" } Disciplina</Text>
          <Divider style={styles.divModal} />
          <Text style={styles.inputText}>Nome:</Text>
          <TextInput style={styles.input} editable={isNew}  onChangeText={e => (inputChange("name",e))} placeholder={" Nome ou Sigla da Displina "} value={disc.name} />
          <Text style={styles.inputText}>Carga Horária Total:</Text>
          <View style={styles.input}>
          <Picker
            selectedValue={disc.ch.toString()}
            accessibilityLabel = {"pickerCH"}
            style={styles.inputDrop}
            onValueChange={(itemValue, itemIndex) => inputChange("ch",itemValue)}
            mode={"dropdown"}
          >
            <Picker.Item label="30 Horas" value="30" />
            <Picker.Item label="45 Horas" value="45" />
            <Picker.Item label="60 Horas" value="60" />
            <Picker.Item label="75 Horas" value="75" />
            <Picker.Item label="90 Horas" value="90" />
            <Picker.Item label="120 Horas" value="120" />
            <Picker.Item label="180 Horas" value="180" />
          
          </Picker>
          </View>
          <Text style={styles.inputText}>Nota Estipulada:</Text>
          <TextInput style={styles.input} onChangeText={e => (inputChange("cf",e))} keyboardType={"numeric"} placeholder={" Nota Estipulada "} value={disc.cf == 0 ? "" : disc.cf.toString()} />
          <Text style={styles.inputObservation}>
          Entradas Válidas: 0.00 a 10.0.
          </Text>
          <View style={styles.dialogBtnView}>
            <TouchableOpacity style={styles.dialogAddBtnCancel} onPress={() => setModalAddVisible(false)}>
              <Text style={styles.dialogAddBtnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dialogAddBtnSaveEdit} onPress={() => refreshListWithModification()}>
              <Text style={styles.dialogAddBtnText}>{ isNew ? "Cadastrar" : "Modificar" }</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
        </Modal>
      </SafeAreaView>
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
dialogAddBtnCancel: {
  padding: 5,
  borderWidth: 1,
  backgroundColor: '#4c4c4c',
  borderColor: 'rgba(0,0,0,0.1)',
  borderRadius: 15,
  alignItems: 'center',
  width: '45%',
},
dialogAddBtnSaveEdit: {
  padding: 5,
  borderWidth: 1,
  backgroundColor: '#004772',
  borderColor: 'rgba(0,0,0,0.1)',
  borderRadius: 15,
  alignItems: 'center',
  width: '45%',
},
dialogBtnView: {
  marginTop: 20,
  width: '95%',
  justifyContent: 'space-between',
  flexDirection: 'row',
},
emptyMsg: {
  marginTop: 20,
  textAlign: 'center',
  fontSize: 16,
  color: '#004772',
  fontWeight: 'bold',
},
inputText: {
  marginTop: 15,
},
viewTwoButton: {
  flexDirection: 'row',
},
actionlistIconRemove: {
  color: '#003b5e',
},
actionlistIconEdit: {
  color: '#003b5e',
},
input: {
  marginTop: 2,
  height: 40,
  width: '95%',
  borderRadius: 5,
  borderColor: 'gray',
  borderWidth: 1,
},
inputDrop: {
  height: '100%',
  width: '100%',
  borderColor: 'gray',
  borderWidth: 1,
},
inputObservation: {
  fontSize: 12,
  textAlign: 'left',
  width: '80%',
  marginLeft: 5,
  color: "#bd2843",
},
aboutContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
},
aboutModalView: {
  backgroundColor: 'rgba(255,255,255,0.9)',
  borderRadius: 20,
  padding: 20,
  alignItems: "center",
  shadowColor: "#000",
  height: '80%',

  width: '95%',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
},
addModalView: {
  backgroundColor: 'rgba(255,255,255,0.9)',
  borderRadius: 20,
  padding: 20,
  shadowColor: "#000",
  width: '80%',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
},
screen: {
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
  textAlign: 'center'
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
actionlistIconBtnLeft: {
  borderWidth: 1,
  borderColor: 'rgba(	0, 71, 114,0.5)',
  borderRadius: 8,
  width: 30,
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 5,
},
actionlistIconBtnRight: {
  borderWidth: 1,
  borderColor: 'rgba(	0, 71, 114,0.5)',
  borderRadius: 8,
  width: 30,
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 5,
},
containerItemMid: {
  width: '95%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
divModal: {
  backgroundColor: 'rgba(0,0,0,0.2)',
  width: '100%',
  textAlign: 'center',
  marginTop: 10,
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
addModalTitle: {
  fontSize: 20,
  color: '#004772',
  fontWeight: 'bold',
  textAlign: 'center'
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
dialogAddBtnText: {
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: 20,
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
  borderColor: 'rgba(	0, 47, 75, 0.2)',
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