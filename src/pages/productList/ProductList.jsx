import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
// import NewMenu from "../newMenu/NewMenu";
import NewItem from "../../components/new/NewItem"

// import {FormGroup} from '@mui/material/FormGroup';
// import {FormControlLabel} from '@mui/material/FormControlLabel';
// import {Switch} from '@mui/material';
// import Switch from '@mui/material/Switch'

export default function ProductList() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const columns = [
    { field: "id", headerName: "序号", width:120 },
    {
      field: "action2",
      headerName: "启用/禁用",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div className="switchStatus">
            </div>
          </>
        );
      },
    },
    {
      field: "product",
      headerName: "图片",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "品牌", width: 200 },
    { field: "aa", headerName: "规格", width: 200 },
    {
      field: "status",
      headerName: "Status",
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
    {
      field: "pos",
      headerName: "pos菜品分类",
      width: 200,
    },
    {
      field: "pos",
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
            <Link to={"/product/" + params.row.id}>
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
