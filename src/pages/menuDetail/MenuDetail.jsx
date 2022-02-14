import { Link } from "react-router-dom";
import "./MenuDetail.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useState, useEffect} from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import SearchInput, {createFilter} from 'react-search-input'

// 动效
const animatedComponents = makeAnimated();

// 获取api地址配置
const apiHost = process.env.REACT_APP_API_HOST

// Fetch menu list
const fetchMenuDetail = async (id) => {
    const res = await fetch(apiHost + '/api/v1/menu/detail/' + id)
    const data = await res.json()
    console.log("data===>", data)
    return data
  }

// Fetch ingred list
const fetchAvailableIngredList = async () => {
    const res = await fetch(apiHost + '/api/v1/ingred/avaiable')
    const data = await res.json()
    console.log("data===>", data)
    return data
  }

export default function MenuDetail(props) {

    console.log("props", props)
    const [usingIngred, setUsingIngred] = useState([]);
    const [ingredImgUrl, setIngredImgUrl] = useState([]);
    const [availableIngred, setAvailableIngred] = useState([]);
    useEffect(() => {
        const getUsingIngred = async () => {
            const tasksFromServer = await fetchMenuDetail(props.menuId)
            setUsingIngred(tasksFromServer.ingred)
            setIngredImgUrl(tasksFromServer.img_url)
        }
        getUsingIngred()

        const getIngredAvailableList = async () => {
            const tasksFromServer = await fetchAvailableIngredList()
            setAvailableIngred(tasksFromServer)
        }

        getIngredAvailableList()
        }, [])

    const handleDelete = (id) => {
        setUsingIngred(usingIngred.filter((item) => item.id !== id));
        // deleteTask(id) // 执行删除动作
        };

    //   配料表定义
    const columns = [
        { field: "id", headerName: "序号", width:120 },
        { field: "name", headerName: "名称", width:120 },
        { field: "unit", headerName: "单位", width:120 },
        { field: "unit_price", headerName: "单价", width:120 },
        { field: "serving_size", headerName: "份量", width:120 },
        {
            field: "action",
            headerName: "操作",
            width: 150,
            renderCell: (params) => {
            return (
                <>
                <Link to={"/menuIngred/" + params.row.id}>
                    <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutline
                    className="productListDelete"
                    onClick={() => handleDelete(params.row.id)}
                />
                </>
            );
            },
        },
    ];

  console.log("data from server", usingIngred)
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">菜品详情</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="销售量统计"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={ingredImgUrl} alt="" className="productInfoImg" />
                  <span className="productName">二两螺蛳粉</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">99991</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">active:</span>
                      <span className="productInfoValue">yes</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">no</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" placeholder="Apple AirPod" />
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
                  <label>Active</label>
                  <select name="active" id="active">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={ingredImgUrl} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>

              <div className="productFormLeft">
                <label>固态配料</label>
                <Select 
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    // defaultValue={[this.state.colourOptions[0], this.state.colourOptions[1]]}
                    isMulti
                    options={availableIngred}
                    // value={this.state.support_list}
                    // onChange={this.handleMenuSupport}
                />
            </div>
            <div className="productFormLeft">
                <label>液态配料</label>
                <Select 
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    // defaultValue={[this.state.colourOptions[0], this.state.colourOptions[1]]}
                    isMulti
                    options={availableIngred}
                    // value={this.state.support_list}
                    // onChange={this.handleMenuSupport}
                />
            </div>

            {/* <SearchInput className="search-input"  />  */}
                {/* {filteredEmails.map(email => {
                return (
                    <div className="mail" key={email.id}>
                    <div className="from">{email.user.name}</div>
                    <div className="subject">{email.subject}</div>
                    </div>
                )
                })} */}
            <input type='submit' value='保存' className='productButton' />
          </form>
      </div>
      {/* <div className="productBottom"> */}
        {/* <div className="productFormLeft">
                  <label>菜品配料表</label>
        </div> */}
        {/* </div> */}
        <DataGrid
                rows={usingIngred}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
    </div>
  );
}
