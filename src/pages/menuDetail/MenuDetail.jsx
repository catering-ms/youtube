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
// import SearchInput, {createFilter} from 'react-search-input'

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
const fetchAvailableIngredList = async (menuId, ingredForm) => {
    const res = await fetch(apiHost + '/api/v1/ingred/avaiable/' + menuId + "/" + ingredForm)
    const data = await res.json()
    console.log("data===>", data)
    return data
  }

// 新增项目
const addItem = async (menu_id, lq, sd, pd, gs) => {
try {
    console.log("gs--->", gs)
    // 打包数据为json
    const obj = {
    "lq": lq,
    "sd": sd,
    "pd": pd,
    "gs": gs,
    "menu_id": menu_id
    }
    const payload = JSON.stringify(obj)
    const res = await fetch(apiHost + '/api/v1/ingred/bind',
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
        const message = `成份已经绑定`;
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

export default function MenuDetail(props) {

    console.log("props", props)
    const [usingIngred, setUsingIngred] = useState([]);
    const [ingredImgUrl, setIngredImgUrl] = useState([]);
    // 液态
    const [lAvailableIngred, setLAvailableIngred] = useState([]);
    // 气态 
    const [gAvailableIngred, setGAvailableIngred] = useState([]);
    // 固态 
    const [sAvailableIngred, setSAvailableIngred] = useState([]);
    // 粉末
    const [pAvailableIngred, setPAvailableIngred] = useState([]);

    // 添加液态
    const [lq, setLq] = useState([]);
    // 添加固态
    const [sd, setSd] = useState([]);
    // 添加气态
    const [gs, setGs] = useState([]);
    // 添加粉末
    const [pd, setPd] = useState([]);

    useEffect(() => {
        const getUsingIngred = async () => {
            const tasksFromServer = await fetchMenuDetail(props.menuId)
            setUsingIngred(tasksFromServer.ingred)
            setIngredImgUrl(tasksFromServer.img_url)
        }
        getUsingIngred()

        const getIngredAvailableList = async () => {
            // 获取粉末
            const p = await fetchAvailableIngredList(props.menuId, "p")
            setPAvailableIngred(p)

            // 获取固态
            const s = await fetchAvailableIngredList(props.menuId, "s")
            setSAvailableIngred(s)

            // 获取液态
            const l = await fetchAvailableIngredList(props.menuId, "l")
            setLAvailableIngred(l)

            // 获取气态
            const g = await fetchAvailableIngredList(props.menuId, "g")
            setGAvailableIngred(g)
        }

        getIngredAvailableList()
        }, [])

    const handleDelete = (id) => {
        setUsingIngred(usingIngred.filter((item) => item.id !== id));
        // deleteTask(id) // 执行删除动作
        };
    // 勾选液体配料
    const handleAddLq = (e) => {
        console.log("e --->", e)
        setLq(e)
    };
    // 勾选固体配料
    const handleAddSd = (e) => {
        setSd(e)
    };

    // 勾选粉末
    const handleAddPd = (e) => {
        setPd(e)
    };

    // 勾选气态
    const handleAddGs = (e) => {
        setGs(e)
    };
    const onSubmit = (e) => {
        console.log("submit now--->")
        e.preventDefault()
        addItem(
        props.menuId,
        lq,
        sd,
        pd,
        gs
        )
        refreshPage()
      };
    const refreshPage = (e) => {
        // window.location.reload(false);
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
          <form className="productForm" onSubmit={onSubmit}>
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
                    options={sAvailableIngred}
                    value={sd}
                    onChange={handleAddSd}
                />
            </div>
            <div className="productFormLeft">
                <label>液态配料</label>
                <Select 
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    // defaultValue={[this.state.colourOptions[0], this.state.colourOptions[1]]}
                    isMulti
                    options={lAvailableIngred}
                    value={lq}
                    onChange={handleAddLq}
                />
            </div>
            <div className="productFormLeft">
                <label>粉末配料</label>
                <Select 
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    // defaultValue={[this.state.colourOptions[0], this.state.colourOptions[1]]}
                    isMulti
                    options={pAvailableIngred}
                    value={pd}
                    onChange={handleAddPd}
                />
            </div>
            <div className="productFormLeft">
                <label>气态配料</label>
                <Select 
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    // defaultValue={[this.state.colourOptions[0], this.state.colourOptions[1]]}
                    isMulti
                    options={gAvailableIngred}
                    value={gs}
                    onChange={handleAddGs}
                />
            </div>
            <input type='submit' value='添加' className='productButton'/>
          </form>
      </div>
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
