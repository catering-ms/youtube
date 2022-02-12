import React, { Component } from 'react';
import "./newMenu.css";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

// 动效
const animatedComponents = makeAnimated();
// 获取api地址配置
const apiHost = process.env.REACT_APP_API_HOST
  // 新增项目
  const addItem = async (name, alias, category, status, shelf_status, support_list, price, vip_price) => {
    try {
      // 打包数据为json
      const obj = {
        "name": name,
        "alias": alias,
        "category": category,
        "status": status,
        "shelf_status": shelf_status,
        "support_list": support_list,
        "price": price,
        "vip_price": vip_price

      }
      const payload = JSON.stringify(obj)
      const res = await fetch(apiHost + '/api/v1/menu/new',
        {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'same-origin', // you need to add this line
        body: payload,
      })
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      
  
      const data =  await res.json()
      console.log("return -->", data)
    } catch (err) {
      console.log("err", err)
      alert(err.message);
    }
  }

class NewMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      alias: "",
      category: "",
      status: "",
      shelf_status: "",
      support_list: null,
      price: 0.0,
      vip_price: 0.0,

      // TODO 后续改为api获取
      colourOptions: [
        { value: 'a', label: '堂食' },
        { value: 'b', label: '外卖' },
        { value: 'c', label: '自提' }
      ]
    }
  } 

  // 赋值菜品名称
  handleMenuName = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  // 赋值菜品别名
  handleMenuAliasName = (e) => {
    this.setState({
      alias: e.target.value
    })
  }

  // 赋值菜品别名
  handleMenuAliasName = (e) => {
    this.setState({
      alias: e.target.value
    })
  }
  // 赋值菜品类型
  handleMenuCategory = (e) => {
    this.setState({
      category: e.target.value
    })
  }

  // 赋值状态
  handleMenuStatus = (e) => {
    this.setState({
      status: e.target.value
    })
  }
  
  // 赋值状态
  handleMenuShelfStatus = (e) => {
    this.setState({
      shelf_status: e.target.value
    })
  }
  // 赋值支持的业务类型
  handleMenuSupport = support_list => {
    this.setState({ support_list });
    console.log(`Option selected:`, support_list);
  };

  // 价格赋值状态
  handleMenuPrice = (e) => {
    this.setState({
      price: e.target.value
    })
  }
  // 会员价格赋值状态
  handleMenuVipPrice = (e) => {
    this.setState({
      vip_price: e.target.value
    })
  }
  // 提交数据
  onSubmit = (e) => {
    e.preventDefault()

    addItem(
      this.state.name,
      this.state.alias,
      this.state.category,
      this.state.status,
      this.state.shelf_status,
      this.state.support_list,
      this.state.price,
      this.state.vip_price
      )
  }

  render () {
    return (
    <div className="newProduct">
      <h1 className="addProductTitle">新增菜品</h1>
      <form className="addProductForm" onSubmit={this.onSubmit}>
        <div className="addProductItem">
          <label>菜品图片</label>
          <input 
          type="file" 
          id="file" 
          />
        </div>
        <div className="addProductItem">
          <label>菜品名称</label>
          <input 
            type="text" 
            placeholder="二两螺蛳粉"
            value={this.state.name}
            onChange={this.handleMenuName}
           />
        </div>
        <div className="addProductItem">
          <label>菜品别名</label>
          <input 
            type="text" 
            placeholder="二两粉" 
            value={this.state.alias}
            onChange={this.handleMenuAliasName}
          />
        </div>
        <div className="addProductItem">
          <label>菜品价格</label>
          <input 
            type="text" 
            placeholder="¥12.00" 
            value={this.state.price}
            onChange={this.handleMenuPrice}
          />
        </div>
        <div className="addProductItem">
          <label>菜品会员价格</label>
          <input 
            type="text" 
            placeholder="¥11.00" 
            value={this.state.vip_price}
            onChange={this.handleMenuVipPrice}
          />
        </div>
        <div className="addProductItem">
          <label>菜品类型</label>
          <div className="newUserGender">
            <input 
              type="radio" 
              name="gender" 
              id="male" 
              value="a"
              value={this.state.name}
              onChange={this.handleMenuName} 
            />
            <label for="male">普通菜</label>
            <input type="radio" name="gender" id="female" value="b" onChange={this.handleMenuCategory}/>
            <label for="female">套餐</label>
            <input type="radio" name="gender" id="other" value="c" onChange={this.handleMenuCategory}/>
            <label for="other">线下临时菜</label>
            <input type="radio" name="gender" id="other" value="d" onChange={this.handleMenuCategory}/>
            <label for="other">线下打包盒</label>
            <input type="radio" name="gender" id="other" value="e" onChange={this.handleMenuCategory}/>
            <label for="other">时价菜</label>
            <input type="radio" name="gender" id="other" value="f" onChange={this.handleMenuCategory}/>
            <label for="other">线下临时套餐</label>
            <input type="radio" name="gender" id="other" value="g" onChange={this.handleMenuCategory}/>
            <label for="other">打包袋</label>
          </div>
        </div>
        <div className="addProductItem">
          <label>售卖状态</label>
          <select name="active" id="active" onChange={this.handleMenuStatus}>
            <option value="yes">启用</option>
            <option value="no">禁用</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>线上上架/下架</label>
          <select name="active" id="active" onChange={this.handleMenuShelfStatus}>
            <option value="yes">上架</option>
            <option value="no">下架</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>支持业务</label>
          <Select 
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[this.state.colourOptions[0], this.state.colourOptions[1]]}
            isMulti
            options={this.state.colourOptions}
            value={this.state.support_list}
            onChange={this.handleMenuSupport}
          />
        </div>
        <input type='submit' value='保存' className='addProductButton' />
      </form>
    </div>
    )
  }
}

export default NewMenu
