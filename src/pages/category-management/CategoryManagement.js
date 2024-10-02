import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import PageTitle from "../../components/PageTitle";

import CategoryCreationModal from "./CategoryCreationModal";
import axiosInstance from "../../common/axios";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

const columns = [
  {
    name: "id",
    label: "Id",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "categoryName",
    label: "카테고리 이름",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "categoryCode",
    label: "카테고리 코드",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "depth",
    label: "LV",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "memo",
    label: "memo",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "parentId",
    label: "parentId",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "updatedAt",
    label: "updatedAt",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "createdAt",
    label: "createdAt",
    options: {
      filter: true,
      sort: false,
    },
  },
];


export default function CategoryManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [size, setSize] = useState(1000);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("id");
  const [totalCount, setTotalCount] = useState(0);
  const [direction, setDirection] = useState("asc");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateData = useCallback(async () => {
    try {
      const receivedData = await fetchData(size, page, sort, direction);
      setData(prevData => {
        if(prevData.length === receivedData.length) {
          return [...prevData, ...receivedData];
        }
        return receivedData
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [size, page, sort, direction]);

  useEffect(() => {
    try {
      console.log(`page: ${page}`);
      updateData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [updateData]);

  const fetchData = async (size, page, sort, direction) => {
    try {
      const response = await axiosInstance.get(`/v1/categories?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
      setTotalCount(response.data.total);
      return response.data.result; // 데이터를 상태에 설정합니다.
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <PageTitle title="카테고리 관리" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            data={data}
            sort={true}
            count={totalCount}
            sortOrder={{ name: sort, direction: direction }}
            page={page}
            options={
              {
                count: totalCount,
                rowsPerPage: size,
                print:false,
                rowsPerPageOptions: [1000],
                customToolbar: () => <Button onClick={openModal}>카테고리 생성</Button>,
                onTableChange: (action, tableState) => {
                  if (action == "changeRowsPerPage") setSize(tableState.rowsPerPage);
                  if (action == "changePage") setPage(tableState.page);
                },
              }
            }
            columns={columns}
          />
        </Grid>
      </Grid>
      <CategoryCreationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
