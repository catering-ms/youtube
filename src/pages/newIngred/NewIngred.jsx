import React, { Component } from 'react';
import "./NewIngred.css";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import DiscreteSliderMarks from "../../components/slider/slider"
import SuccessAlert from "../../components/alert/success"

// 动效
const animatedComponents = makeAnimated();
// 获取api地址配置
const apiHost = process.env.REACT_APP_API_HOST
  // 新增项目
  const addItem = async (name, unit, unit_price, category, status, 
    serving_size, expire, form, priceValue) => {
    try {
      // 打包数据为json
      const obj = {
        "name": name,
        "unit": unit,
        "unit_price": unit_price,
        "category": category,
        "status": status, 
        "serving_size": serving_size,
        "expire": expire,
        "form": form,
        "priceValue": priceValue

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
      // this.state.addStatus = "success"
      // this.setState({addStatus: "success"})

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
      form: "",
      priceValue: 0.0,
      addStatus: ""

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
  handleIngredForm = (e) => {
    this.setState({
      form: e.target.value
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
  handlePriceChange = (e) => {
    this.setState({
      priceValue: e.target.value
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
      this.state.form,
      this.state.priceValue
      )
    this.setState({
      addStatus: "success"
    })
  }

  render () {
    return (
    <div className="newProduct">
      {this.state.addStatus=="success"?<SuccessAlert/>:null}

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
            required
           />
        </div>
        <div className="addProductItem">
          <label>配料形态</label>
          <select name="active" id="active" onChange={this.handleIngredForm}>
            <option value="l">液态</option>
            <option value="s">固态</option>
            <option value="g">气态</option>
            <option value="p">粉末</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>规格</label>
          <select name="active" id="active" onChange={this.handleIngredForm}>
            <option value="l">克</option>
            <option value="s">毫升</option>
            <option value="g">勺</option>
            <option value="p">斤</option>
          </select>
        </div>


        <div className="addProductItem">
          <label>价格</label>
          {/* <input 
            type="text" 
            placeholder="¥1.00" 
            value={this.state.unit_price}
            onChange={this.handleIngredUnitPrice}
          /> */}
              <input 
              id="typeinp" 
              type="range" 
              min="0" max="20" 
              value={this.state.priceValue} 
              onChange={this.handlePriceChange}
              step="0.5"/>
              <output>{this.state.priceValue} </output>
        </div>
        <div className="addProductItem">
          <label>配料份量</label>
          <DiscreteSliderMarks />
        </div>
        <div className="addProductItem">
          <label>配料状态</label>
          <select name="active" id="active" onChange={this.handleIngredStatus}>
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
