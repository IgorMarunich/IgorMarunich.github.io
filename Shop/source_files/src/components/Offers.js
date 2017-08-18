import React, { Component } from 'react';
import './css/offers.css';

class Offers extends Component {
  
  render () {
    
    return (
      <div className="footer_wrapper_for_each_blocks">
        <div className="offers">
          <h2>HOT OFFERS</h2>
          <p>Vestibulum ante ipsum primis in faucibus orci luctus
            et ultrices posuere cubilia curae.
            Suspendisse sollicitudin velit sed leo.
            Ut pharetra augue nec augue. Nam elit magna, hend.</p>
          <ul>
            <li>Vestibulum ante ipsum primis in faucibus orci luctus</li>
            <li>Nam elit magna hendrerit sit amet tincidunt ac</li>
            <li>Quisque diam lorem interdum vitae dapibus ac scele</li>
            <li>Donec eget tellus non erat lacinia fermentum</li>
            <li>Donec in velit vel ipsum auctor pulvin</li>
          </ul>
        </div>
    </div>
    );
    
  }
  
}

export default Offers;