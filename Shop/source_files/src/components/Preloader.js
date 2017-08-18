import React, { Component } from 'react';
import './css/preloader.css';

class Preloader extends Component {
  
  onClick(){
    console.log('preloader div ', this.preloader);
    this.preloader.style.display = "block";
    this.preloader.style.opacity = 0.5;
    
    
    
    
    setTimeout(() => {
      this.interloader = setInterval(() => {
        this.preloader.style.opacity = this.preloader.style.opacity - 0.05;
        if (this.preloader.style.opacity <= 0.05){
          clearInterval(this.interloader);
          this.preloader.style.display = "none";
        }
      },20);
    },2000);
  }


  render(){
    
    return (
      <div>
        <div className="preloader" ref={(div)=>{this.preloader = div}}>
        </div>
        <input
          value='onPreload'
          type="button"
          onClick={this.onClick.bind(this)}/>
        
      </div>
    );
  }
}

export default Preloader;