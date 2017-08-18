import React, { Component } from 'react';
import './css/offers.css';
import './css/information.css';

class Information extends Component {
  
  render () {
    
    return (
      <div className="footer_wrapper_for_each_blocks">
        <div className="information">
          <h2>STORE INFORMATION</h2>
          <div className="information_inner_sign_text">
            <div className="sprite sprite-place_on_map">
            
            </div>
            <p>Company Inc., 8901 Marmora Road, Glasgow, D04 89GR</p>
          </div>
          <div className="information_inner_sign_text">
            <div className="sprite sprite-phone">
            
            </div>
            <p>Call us now toll free: (800) 2345-6789</p>
          </div>
          <div className="information_inner_sign_text">
            <div className="sprite sprite-mail">
            
            </div>
            <p>Customer support: support@example.com</p>
            <p>Press: pressroom@example.com</p>
          </div>
          <div className="information_inner_sign_text">
            <div className="sprite sprite-skype">
            
            </div>
            <p>Skype: sample-username</p>
          </div>
        </div>
      </div>
    );
    
  }
  
}

export default Information;