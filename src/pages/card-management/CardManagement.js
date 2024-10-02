import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

import PageTitle from "../../components/PageTitle";
import axiosInstance from "../../common/axios";
import CardCreationModal from "./CardCreationModal";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const columns = [
  {
    name: "cardId",
    label: "Card Id",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "category1Id",
    label: "카테고리1 코드",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "category1Name",
    label: "카테고리1 이름",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "category2Id",
    label: "카테고리2 코드",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "category2Name",
    label: "카테고리2 이름",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "category3Id",
    label: "카테고리3 코드",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "category3Name",
    label: "카테고리3 이름",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "seriesId",
    label: "시리즈 코드",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "seriesName",
    label: "시리즈 이름",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "template",
    label: "템플릿이름",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "title",
    label: "Title",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "description",
    label: "설명",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "backgroundColor",
    label: "배경색",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "iconUrl",
    label: "icon",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "landingType",
    label: "랜딩타입",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "landingPath",
    label: "랜딩경로",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "params",
    label: "기타연결정보",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "backgroundImageUrl",
    label: "배경이미지",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "startDate",
    label: "노출시작날짜",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "endDate",
    label: "노출종료날짜",
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
    name: "homeCardExposeStatus",
    label: "홈카드노출",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "myCarExposeStatus",
    label: "내차영역노출",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "myAssetExposeStatus",
    label: "내자산영역노출",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "myProductExposeStatus",
    label: "내상품영역노출",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "approvalByManager",
    label: "승인",
    options: {
      filter: true,
      sort: false,
    },
  },
];

async function getHomeCards() { // async, await을 사용하는 경우
  try {
    // GET 요청은 params에 실어 보냄
    const response = await axiosInstance.get('/v1/home-cards', {
      params: {
        ID: 12345
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("version 1");
    console.log(response);
  } catch (e) {
    // 실패 시 처리
    console.error(e);
  }
}

export default function CardManagement() {
  const classes = useStyles();
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

  const updateData = useCallback(async (size, page, sort, direction) => {
    try {
      const receivedData = await fetchData(size, page, sort, direction);
      setData(prevData => [...receivedData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);


  useEffect(() => {
    try {
      console.log(`page: ${page}`);
      updateData(size, page, sort, direction);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [updateData, size, page, sort, direction]);

  const fetchData = async (size, page, sort, direction) => {
    try {
      const response = await axiosInstance.get(`/v1/home-cards?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
      setTotalCount(response.data.total);
      return response.data.result; // 데이터를 상태에 설정합니다.
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <PageTitle title="카드 관리" />
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
                customToolbar: () => <Button onClick={openModal}>카드 생성</Button>,
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
      <CardCreationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
