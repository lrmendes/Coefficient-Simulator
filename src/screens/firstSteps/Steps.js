import React from 'react';
import { Dimensions } from 'react-native';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import Carousel, {Pagination} from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          activeIndex:0,
          carouselItems: [
          {
            title: "Primeiros Passos",
            btText: "Próximo",
            text1: "O Coefficient Simulator é um APP para simular coeficientes futuros baseado em notas estipuladas para cada matéria atual",
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
          },
        ],
      },
      this._renderItem = this._renderItem.bind(this);
      //this.carousel = this.carousel.bind(this);
    }
    
    

    nextStep = () => {
      if (this.state.activeIndex === this.state.carouselItems.length -1) {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Main' },
          ],}))
      } else {
        this.setState({activeIndex: this.state.activeIndex + 1})
        this.carousel.snapToNext();
      }
    }

    _renderItem({item,index}) {
        return (
          <View style={styles.container}>
              <View>
                <Text style={styles.title1}>{item.title}</Text>
                <Text style={styles.text1}>{item.text1}</Text>
                <Text style={styles.text1}>{item.text2}</Text>
                <Text style={styles.text1}>{item.text3}</Text>
                {item.text4}
              </View>
              <View>
                <TouchableOpacity style={styles.btNext} onPress={() => this.nextStep()}>
                  <Text style={styles.btNextText}>{item.btText}</Text>
                </TouchableOpacity>
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
    backgroundColor:'floralwhite',
    borderRadius: 3,
    height: viewportHeight,
    padding: 20,
    marginLeft: 15,
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 15,
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
    textAlign: 'justify',
  }
});