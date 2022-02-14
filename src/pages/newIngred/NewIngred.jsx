import React, { Component } from 'react';
import "./NewIngred.css";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';


// 动效
const animatedComponents = makeAnimated();
// 获取api地址配置
const apiHost = process.env.REACT_APP_API_HOST
  // 新增项目
  const addItem = async (name, unit, unit_price, category, status, serving_size, expire) => {
    try {
      // 打包数据为json
      const obj = {
        "name": name,
        "unit": unit,
        "unit_price": unit_price,
        "category": category,
        "status": status, 
        "serving_size": serving_size,
        "expire": expire

      }
      const payload = JSON.stringify(obj)
      const res = await fetch(apiHost + '/api/v1/ingred/new',
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

        if (res.status === 409) {
          const message = `配料名称重复`;
          throw new Error(message);
        }
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


class NewIngred extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      unit: 0.0,
      unit_price: 0.0,
      category: "",
      status: "",
      serving_size: "",
      expire: "",

      // TODO 后续改为api获取
      // colourOptions: [
      //   { value: 'a', label: '堂食' },
      //   { value: 'b', label: '外卖' },
      //   { value: 'c', label: '自提' }
      // ]
    }
  } 

  // 赋值配料名称
  handleIngredName = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  // 赋值单价
  handleIngredUnit = (e) => {
    this.setState({
      unit: e.target.value
    })
  }

  // 赋值单价
  handleIngredUnitPrice = (e) => {
    this.setState({
      unit_price: e.target.value
    })
  }

  // 赋值菜品类型
  handleIngredCategory = (e) => {
    this.setState({
      category: e.target.value
    })
  }

  // 赋值状态
  handleIngredStatus = (e) => {
    this.setState({
      status: e.target.value
    })
  }
  
  // 赋值状态
  handleIngredServingSize = (e) => {
    this.setState({
      serving_size: e.target.value
    })
  }

  // 有效期
  handleIngredExpire = (e) => {
    this.setState({
      expire: e.target.value
    })
  }
  
  // 提交数据
  onSubmit = (e) => {
    e.preventDefault()

    addItem(
      this.state.name,
      this.state.unit,
      this.state.unit_price,
      this.state.category,
      this.state.status,
      this.state.serving_size,
      this.state.expire,
      )
  }

  render () {
    return (
    <div className="newProduct">
      <h1 className="addProductTitle">新增配料</h1>
      <form className="addProductForm" onSubmit={this.onSubmit}>
        <div className="addProductItem">
          <label>图片</label>
          <input 
          type="file" 
          id="file" 
          />
        </div>
        <div className="addProductItem">
          <label>名称</label>
          <input 
            type="text" 
            placeholder="料酒"
            value={this.state.name}
            onChange={this.handleIngredName}
           />
        </div>
        <div className="addProductItem">
          <label>类型</label>
          <input 
            type="text" 
            placeholder="液体类型" 
            value={this.state.category}
            onChange={this.handleIngredCategory}
          />
        </div>
        {/* <div className="addProductItem">
          <label>来源</label>
          <input 
            type="text" 
            placeholder="柳州粉" 
            value={this.state.brand}
            onChange={this.handleIngredUnitPrice}
          />
        </div> */}
        <div className="addProductItem">
          <label>规格</label>
          <input 
            type="text" 
            placeholder="500ML/¥12.0" 
            value={this.state.unit}
            onChange={this.handleIngredUnit}
          />
        </div>
        <div className="addProductItem">
          <label>份量/价格</label>
          <input 
            type="text" 
            placeholder="¥1.00" 
            value={this.state.unit_price}
            onChange={this.handleIngredUnitPrice}
          />
        </div>
        {/* <div className="addProductItem">
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
        </div> */}
        <div className="addProductItem">
          <label>配料状态</label>
          <select name="active" id="active" onChange={this.handleMenuStatus}>
            <option value="yes">启用</option>
            <option value="no">禁用</option>
          </select>
        </div>
        {/* <div className="addProductItem">
          <label>线上上架/下架</label>
          <select name="active" id="active" onChange={this.handleMenuShelfStatus}>
            <option value="yes">上架</option>
            <option value="no">下架</option>
          </select>
        </div> */}
        {/* <div className="addProductItem">
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
        </div> */}
        <input type='submit' value='保存' className='addProductButton' />
      </form>
    </div>
    )
  }
}

export default NewIngred
