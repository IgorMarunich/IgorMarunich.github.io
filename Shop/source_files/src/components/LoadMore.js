import React, { Component } from 'react';
import { newCounter } from "../actions/newCounter"
import './css/preloader.css';
import './css/button.css';

const counter = newCounter();

class LoadMore extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      preloader: false
    };
  }
  
  componentDidMount (){
  
    let url = `/list.php?page=${counter()}`;
  
    let xhr = new XMLHttpRequest();
  
    xhr.open('GET', url, true);
  
    xhr.send();
    
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
    
      if (xhr.status !== 200) {
        // if error
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        // get result
      
        this.data = JSON.parse(xhr.responseText);
        // return data;
        
        if (this.data.entities.length === 0) {
          
          this.setState({ visible: true });
        }
        
        this.setState({ preloader: false });
        
        this.counter = 0;
      
        
      }
    
    };
  }
  
  getNextItems () {
    if (this.counter === 0){
      this.props.getData(this.data);
      this.componentDidMount();
    }
    
    this.counter++;
    
    if (this.counter > 1){
      this.setState({ preloader: true });
    }
    
  }
  
  render(){
    return (
      <div className="btn_load_more_wrapper">
        <div
          className={(this.state.visible ? 'none': 'btn btn_add')}
          onClick={this.getNextItems.bind(this)}>
          
          <p>LOAD MORE</p>
          
          <div className={(this.state.preloader ? 'preloader': '')}>
          
          </div>
        </div>
      </div>
    );
  }
}

export default LoadMore;