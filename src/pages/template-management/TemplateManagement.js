import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

const datatableData = [
  ["template_001", "title, bgImage, description", "Garden Kim", "2020/10/20T10:10:10","history"],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function TemplateManagement() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Template Management" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            data={datatableData}
            columns={["템플릿 아이디", "구성 요소", "최근 변경한 사람", "최근 변경 시간", "미리보기"]}
          />
        </Grid>
      </Grid>
    </>
  );
}
