import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

import PageTitle from "../../components/PageTitle/PageTitle";

const datatableData = [
  ["S_1", "user.name", "로그인한 사용자의 이름", "단순 텍스트", "Brad", "2020/10/20T10:10:10","history", "여기저기"],
  ["S_2", "ownedCars.name", "소유한 자동차의 차종명", "텍스트 리스트", "Sofia", "2020/10/21T10:10:10","history", "여기저기"],
  ["S_3", "cards.thisMonth.billing.date.yyyyMMdd", "사용중인 크레디트 카드 이번 달 청구일", "날짜 리스트", "Sofia", "2020/10/21T10:10:10","history", "여기저기"],
  ["S_4", "ownedCars.inspection.date.yyyyMMdd", "소유한 차량의 검사 날짜(연월일)", "날짜 리스트", "Sofia", "2020/10/21T10:10:10","history", "여기저기"],
  ["S_4", "ownedCars.inspection.date.dd", "소유한 차량의 검사 날짜(일자)", "날짜 리스트", "Sofia", "2020/10/21T10:10:10","history", "여기저기"],
  ["S_5", "loans.thisMonth.billing.date.yyyyMMdd", "유효한 대출 이번 달 청구일", "날짜 리스트", "Sofia", "2020/10/21T10:10:10","history", "여기저기"],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function PersonalData() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="개인화 슬롯 관리" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title= "개인화 슬롯 리스트"
            data={datatableData}
            columns={["슬롯 코드", "설명", "타입", "최근 변경한 사람", "최근 변경 시간", "변경 히스토리", "사용하는 곳"]}
          />
        </Grid>
      </Grid>
    </>
  );
}
