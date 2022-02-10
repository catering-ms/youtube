import React, { Component } from 'react';
import "./newMenu.css";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
// import { useState } from 'react'

const animatedComponents = makeAnimated();
// 获取api地址配置
const apiHost = process.env.REACT_APP_API_HOST
  // 新增项目
  const addItem = async (name, alias) => {
    try {
      // 打包数据为json
      const obj = {
        "name": name,
        "alias": alias
      }
      const payload = JSON.stringify(obj)
      const res = await fetch(apiHost + '/newMenu',
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
  // 提交数据
  onSubmit = (e) => {
    e.preventDefault()

    // if (!text) {
    //   alert('Please add a task')
    //   return
    // }

    addItem(
      this.state.name,
      this.state.alias
      )
  }


  // const colourOptions2 = [
  //   { value: 'a', label: '普通菜' },
  //   { value: 'b', label: '套餐' },
  //   { value: 'c', label: '线下临时菜' },
  //   { value: 'd', label: '线下临时套餐' },
  //   { value: 'e', label: '线下打包盒' },
  //   { value: 'f', label: '打包袋' },
  //   { value: 'g', label: '时价菜' }
  // ]

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
          <label>菜品类型</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">普通菜</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">套餐</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">线下临时菜</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">线下打包盒</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">时价菜</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">线下临时套餐</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">打包袋</label>
          </div>
        </div>
        <div className="addProductItem">
          <label>售卖状态</label>
          <select name="active" id="active">
            <option value="yes">启用</option>
            <option value="no">禁用</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>线上上架/下架</label>
          <select name="active" id="active">
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
          />
        </div>
        <input type='submit' value='保存' className='addProductButton' />
      </form>
    </div>
    )
  }
}

export default NewMenu
