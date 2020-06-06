import React from 'react';
import { Dimensions } from 'react-native';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import Carousel, {Pagination} from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          activeIndex:0,
          crNum: 0,
          chNum: 0,
          carouselItems: [
            {
              body: <ScrollView persistentScrollbar={true}style={styles.scrollView}>
                      <Text style={styles.title1}>Primeiros Passos</Text>
                      <Text style={styles.text1}>O Coefficient Simulator é um APP para simular coeficientes futuros baseado em notas estipuladas para cada matéria atual.</Text>
                      <Text style={styles.text1}>Caso esteja no primeiro semestre e não possua coeficiente de rendimento poderá avançar o tutorial.</Text>
                      <Text style={styles.text1}>Caso já possua um coeficiente de rendimento é necessário adicionar dois números encontrados em seu perfil no portal do aluno.</Text>
                      <Text style={styles.text1}>Siga o passo a passo inicial para obter os valores de <Text style={styles.text1B}>carga horária total cursada</Text> e <Text style={styles.text1B}>coeficiente de rendimento</Text>.</Text>
                    </ScrollView>,
              footer: <View>
                      <TouchableOpacity style={styles.btNext} onPress={() => this.nextStep()}>
                        <Text style={styles.btNextText}>Próximo</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btJump} onPress={() => this.finishSteps()}>
                        <Text style={styles.btJumpText}>Pular Tutorial</Text>
                      </TouchableOpacity>
                      </View>
            },
            {
              body: <ScrollView persistentScrollbar={true} style={styles.scrollView}>
                      <Text style={styles.title1}>Passo 1</Text>
                      <Text style={styles.text1}>Acesse o <Text style={styles.text1B}>Portal do Aluno</Text> pelo celular ou computador.</Text>
                      <Text style={styles.text1}>Acesse a aba <Text style={styles.text1B}>Histórico Completo</Text>.</Text>
                      <Image style={styles.stretch} source={require('../../assets/firstSteps/step1.png')}  />
                      </ScrollView>,
              footer: <View>
                      <TouchableOpacity style={styles.btNext} onPress={() => this.nextStep()}>
                        <Text style={styles.btNextText}>Próximo</Text>
                      </TouchableOpacity>
                      </View>
            },
            {
              body: <ScrollView persistentScrollbar={true}style={styles.scrollView}>
                      <Text style={styles.title1}>Passo 2</Text>
                      <Text style={styles.text1}>Dentro dessa aba clique sobre o número de seu coeficiente e será aberta uma página contendo os dois valores necessários.</Text>
                      </ScrollView>,
              footer: <View>
                      <TouchableOpacity style={styles.btNext} onPress={() => this.nextStep()}>
                        <Text style={styles.btNextText}>Próximo</Text>
                      </TouchableOpacity>
                      </View>
            },
            {
              body: <ScrollView persistentScrollbar={true}style={styles.scrollView}>
                      <Text style={styles.title1}>Passo 3</Text>
                      <Text style={styles.text1}>Identifique os dois valores correspondentes ao seu CF e CH.</Text>
                      </ScrollView>,
              footer: <View>
                      <TouchableOpacity style={styles.btNext} onPress={() => this.nextStep()}>
                        <Text style={styles.btNextText}>Pronto</Text>
                      </TouchableOpacity>
                      </View>
            },
            {
              body: <ScrollView persistentScrollbar={true}style={styles.scrollView}>
                      <Text style={styles.title1}>Passo 4</Text>
                      <Text style={styles.text1}>Insira os valores exatos encontrados no passo anterior.</Text>
                      <Text style={styles.inputText}>Coeficiente de Rendimento (NF * CH)</Text>
                      <TextInput style={styles.input} onChangeText={e => this.setState({crNum : e})} keyboardType={"numeric"} placeholder={" CR"} value={this.crNum} />
                      <Text style={styles.inputText}>Carga Horária Total (CH)</Text>
                      <TextInput style={styles.input} onChangeText={e => this.setState({chNum : e})} keyboardType={"numeric"} placeholder={" CH"} value={this.chNum} />
                      </ScrollView>,
              footer: <View>
                      <TouchableOpacity style={styles.btNext} onPress={() => this.nextStep()}>
                        <Text style={styles.btNextText}>Pronto</Text>
                      </TouchableOpacity>
                      </View>
            },
            
          /*{
            title: "Primeiros Passos",
            btText: "Próximo",
            text1: "O Coefficient Simulator é um APP para simular coeficientes futuros baseado em notas estipuladas para cada matéria atual.",
            text2: `Caso esteja no primeiro semestre e não possua coeficiente de rendimento poderá avançar o tutorial.`,
            text3: `Caso já possua um coeficiente de rendimento é necessário adicionar dois números encontrados em seu perfil no portal do aluno.`,
            text4: <Text style={styles.text1}>Siga o passo a passo inicial para obter os valores de <Text style={{fontWeight: 'bold'}}>carga horária total cursada</Text> e <Text style={{fontWeight: 'bold'}}>coeficiente de rendimento</Text>.</Text>,
          },
          {
              title:"Item 2",
              text: "Text 2",
              btText: "Próximo"
          },
          {
              title:"Item 3",
              text: "Text 3",
              btText: "Próximo"
          },
          {
              title:"Item 4",
              text: "Text 4",
              btText: "Próximo"
          },
          {
              title:"Item 5",
              text: "Text 5",
              btText: "Pronto"
          },*/
        ],
      },
      this._renderItem = this._renderItem.bind(this);
      //this.carousel = this.carousel.bind(this);
    }
    
    finishSteps = () => {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Main' },
        ],}))
    }

    nextStep = () => {
      if (this.state.activeIndex === this.state.carouselItems.length -1) {
        this.finishSteps()
      } else {
        this.setState({activeIndex: this.state.activeIndex + 1})
        this.carousel.snapToNext();
      }
    }

    _renderItem({item,index}) {
        return (
          <View style={styles.container}>
              {item.body}
              <View>
                {item.footer}
              </View>
          </View>

        )
    }

    get pagination () {
      return (
          <Pagination
            dotsLength={this.state.carouselItems.length}
            activeDotIndex={this.state.activeIndex}
            containerStyle={{paddingVertical: 20}}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: '#097100',
            }}
            inactiveDotStyle={{
                // Define styles for inactive dots here
                backgroundColor: 'rgba(255,255,255,0.4)',
            }}
            inactiveDotScale={1}
          />
      );
  }

  render () {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor:'#5DB075', paddingTop: 15, }}>
          <View style={{ flex: 1, flexDirection:'column', justifyContent: 'center', }}>
              <Carousel
                data={this.state.carouselItems}
                renderItem={this._renderItem}
                ref={ c => this.carousel = c }
                onSnapToItem = { index => this.setState({activeIndex:index}) }
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                slideStyle={{ width: viewportWidth }}
              />
              { this.pagination }
          </View>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#ffffff',
    borderRadius: 10,
    height: viewportHeight,
    padding: 20,
    marginLeft: 15,
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 15,
  },
  scrollView: {
    marginBottom: 10,
  },
  btNext: {
    padding: 15,
    backgroundColor: '#5DB075',
    borderRadius: 15,
    alignItems: 'center',
  },
  btNextText: {
    color: '#ffffff',
  },
  btJump: {
    marginTop: 15,
    alignItems: 'center',
  },
  btJumpText: {
    color: '#5DB075',
  },
  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },
  title1: {
    fontSize: 30,
    color: '#000000',
    textAlign: 'center',
  },
  text1: {
    marginTop: 10,
    marginRight: 5,
    textAlign: 'justify',
  },
  text1B: {
    marginTop: 10,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
  stretch: {
    marginTop: 5,
    maxWidth: '98%',
    borderRadius: 3,
  },
  inputText: {
    marginTop: 15,
  },
  input: {
    marginTop: 2,
    height: 40,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  }
});