import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

import PageTitle from "../../components/PageTitle/PageTitle";

const datatableData = [
  ["App 3.0 화면 디자인", "디지털 사업 개발실", "디지털 디자인팀", "history"],
  ["App 3.0 기획", "디지털 사업 개발실", "디지털 BizPM팀", "history"],
  ["App 3.0 로그인 정책", "디지털 사업 개발실", "Digital BizPm팀", "history"],
  ["차량 업데이트", "오토 사업실", "자동차 정보 관리팀", "history"],
  ["App 3.0 화면 개발", "디지털 사업 개발실", "디지털 프론트엔드 개발팀", "history"],
  ["App 3.0 API 개발", "디지털 사업 개발실", "디지털 백엔드 개발팀", "history"],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Contacts() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="업무 별 연락처" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title= "업무 별 연락"
            data={datatableData}
            columns={["업무명", "담당 부서", "담당 팀", "변경 히스토리"]}
          />
        </Grid>
      </Grid>
    </>
  );
}
