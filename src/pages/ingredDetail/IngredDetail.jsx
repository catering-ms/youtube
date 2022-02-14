import { Link } from "react-router-dom";
import "./IngredDetail.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useState, useEffect} from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

// 获取api地址配置
const apiHost = process.env.REACT_APP_API_HOST

// Fetch menu list
const fetchMenuDetail = async (id) => {
    const res = await fetch(apiHost + '/api/v1/ingred/detail/' + id)
    const data = await res.json()
    console.log("data===>", data)
    return data
  }

export default function IngredDetail(props) {

    console.log("props", props)
    const [data, setData] = useState([]);
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchMenuDetail(props.menuId)
            setData(tasksFromServer.ingred)
        }

        getTasks()
        }, [])

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
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

  console.log("data from server", data)
//   const fakeData = [
//     {
//       "id": 1,
//       "name": "a"
//     }
//   ];
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">配料详情</h1>
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
                  <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productInfoImg" />
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
                  <label>配料信息详情</label>
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
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
      {/* <div className="productBottom"> */}
        {/* <div className="productFormLeft">
                  <label>菜品配料表</label>
        </div> */}
        {/* </div> */}
        <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
    </div>
  );
}
