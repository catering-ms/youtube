import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
// import NewMenu from "../newMenu/NewMenu";
import NewItem from "../../components/new/NewItem"
// 获取api地址配置
const apiHost = process.env.REACT_APP_API_HOST

// Fetch menu list
const fetchMenuList = async () => {
  const res = await fetch(apiHost + '/api/v1/menu/all')
  const data = await res.json()
  console.log("data===>", data)
  return data
}

const deleteTask = async (id) => {
  const res = await fetch(apiHost + '/api/v1/menu/delete/' + id, {
    method: 'DELETE',
  })

  //We should control the response status to decide if we will change the state or not.
  // if res.status === 200 {
  //   return true
  // }
    // ? setData(data.filter((task) => task.id !== id))
    // : alert('Error Deleting This Task')
}

export default function ProductList() {

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
    // {
    //   field: "action2",
    //   headerName: "启用/禁用",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <div className="switchStatus">
    //         </div>
    //       </>
    //     );
    //   },
    // },
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
      field: "price",
      headerName: "售价",
      width: 160,
    },
    {
      field: "vip_price",
      headerName: "会员价",
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
            <Link to={"/menuDetail/" + params.row.id}>
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

      <NewItem reqPath="/newmenu" title=""/>
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
