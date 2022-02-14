import "./IngredList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import NewItem from "../../components/new/NewItem"
// 获取api地址配置
const apiHost = process.env.REACT_APP_API_HOST

// Fetch menu list
const fetchMenuList = async () => {
  const res = await fetch(apiHost + '/api/v1/ingred/all')
  const data = await res.json()
  console.log("data===>", data)
  return data
}

const deleteTask = async (id) => {
  const res = await fetch(apiHost + '/api/v1/ingred/delete/' + id, {
    method: 'DELETE',
  })
}

export default function IngredList() {

  // const productInfo = fetchMenuList()
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchMenuList()
      setData(tasksFromServer.data)
    }
    getTasks()
  }, [])

  // const data = productInfo.data
  console.log("row data->", data)
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    deleteTask(id)
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const columns = [
    { field: "id", headerName: "序号", width:120 },
    {
      field: "product",
      headerName: "图片",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img_url} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "brand", headerName: "品牌", width: 200 },
    // { field: "aa", headerName: "规格", width: 200 },
    {
      field: "status",
      headerName: "状态",
      width: 120,
    },
    {
      field: "unit",
      headerName: "规格",
      width: 160,
    },
    {
      field: "unit_price",
      headerName: "单价",
      width: 160,
    },
    // {
    //   field: "pos",
    //   headerName: "pos菜品分类",
    //   width: 200,
    // },
    {
      field: "category",
      headerName: "线上菜品分类",
      width: 200,
    },
    {
      field: "action",
      headerName: "操作",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/ingredDetail/" + params.row.id}>
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

  return (
    <div className="productList">

      <NewItem reqPath="/newIngred" title=""/>
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
