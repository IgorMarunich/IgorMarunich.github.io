import React, { Component } from 'react';
import './App.css';

import LoadMore from './components/LoadMore';
import Item from './components/Item';
import Offers from './components/Offers';
import Information from './components/Information';

const stateElements = [
  {
    title: 'test title 1',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    cost: 249,
    discountCost: 199,
    'new': true,
    img: '/img/clothes/layer-311.png',
  },
  {
    title: 'test title 2',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    cost: 249,
    discountCost: null,
    'new': false,
    img: '/img/clothes/layer-312.png'
  },
  {
    title: 'test title 3',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    cost: 125,
    'new': true,
    discountCost: null,
    img: '/img/clothes/layer-313.png'
  },
  {
    title: 'test title 4',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    cost: 111,
    discountCost: 90,
    'new': false,
    img: '/img/clothes/layer-314.png'
  }
];

class App extends Component {
  
  constructor (props){
    super (props);

    this.state = { asyncGetter: []};
    
  }

  render(){
    
    let elems = stateElements.map((item, index) => {
      return (
        <Item key={index} items={item}/>
      )
    });
    
    
    let templateBlocks;
    
    if (this.state.asyncGetter){

      templateBlocks = this.state.asyncGetter.map((item, index) => {
        return (
          <Item key={index} items={item}/>
        )
      });
    }
    
    
    return (
      <div className="app">
        
        <div>
          {elems}
          {templateBlocks}
        </div>
        
        
        <LoadMore getData={(data)=> {
          this.setState({ asyncGetter: this.state.asyncGetter.concat(data.entities) });
        }}/>
        
        <div className="footer">
          <Offers/>
          <Offers/>
          <Information/>
        </div>
        
      </div>
    );
  }

}

export default App;
