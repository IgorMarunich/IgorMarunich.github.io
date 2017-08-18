import React, { Component } from 'react';
import './css/item.css';


class Item extends Component {
  
  componentDidMount() {
    
    this.div.style.opacity = 0.05;
    
    
    let isShowing = setInterval(() => {
      this.div.style.opacity = +this.div.style.opacity + 0.05;
      if (this.div.style.opacity >= 1) {
        clearInterval(isShowing);
        
        this.div.style.opacity = 1;
      }
    }, 20);
  }
  
  render (){
    
    let items = this.props.items;
    
    return (
      <div className="item" ref={(div) => {
        this.div = div;
      }}>
        <div className="item_inner">
          <div className="item_wrapper_img">
            <div className="item_inner_img">
              <img className="item_img" src={items.img} alt={items.title}/>
            </div>
            <div
              className={(items.discountCost ? "item_badge item_badge_sale": 'none')}>
              <div className="item_badge_inner_text">
                <p>SALE</p>
              </div>
            </div>
            <div className={(items.new ? "item_badge item_badge_new": 'none')}>
              <div className="item_badge_inner_text">
                <p>NEW</p>
              </div>
            </div>
          </div>
          <p className="item_title">{items.title}</p>
          <p className="item_description">{items.description}</p>
          <ul>
            <li
              className={(items.discountCost ? 'item_cost' : 'none')}>
              ${items.discountCost}</li>
            <li
              className={(items.discountCost ? 'item_discount_cost': "item_cost")}>
              ${items.cost}</li>
          </ul>
          <div>
            <div className="btn btn_add">
              <p>ADD TO CART</p>
            </div>
            
            <div className="btn_center_block">
            </div>
            
            <div className="btn btn_view">
              <p>VIEW</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;