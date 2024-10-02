import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

import PageTitle from "../../components/PageTitle/PageTitle";

const datatableData = [
  ["T_1", "당신의 대출 상세 내역을 확인해보세요", "Brad", "2020/10/20T10:10:10","history", "여기저기"],
  ["T_2", "{user.name}님의 대출을 확인해보세요", "Sofia", "2020/10/21T10:10:10","history", "여기저기"],
  ["T_3", "{ownedCars.name}의₩ 정기 검사일이 이번달 {ownedCars.inspection.date.dd}일 입니다.", "Sofia", "2020/10/21T10:10:10","history", "여기저기"],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Strings() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="문구 관리" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="마이 배너 리스트"
            data={datatableData}
            columns={["문구 코드", "문구", "최근 변경한 사람", "최근 변경 시간", "변경 히스토리", "사용하는 곳"]}
          />
        </Grid>
      </Grid>
    </>
  );
}
