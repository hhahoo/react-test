import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

const titles = {
  id: "문구 코드",
  name: "문구",
  email: "등록한 사람",
  product: "등록 날짜",
  date: "수정 날짜",
  city: "변경 히스토리",
  status: "상태"
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{titles[key.toLowerCase()]}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, name, email, product, price, date, city, status }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{product}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{city}</TableCell>
            <TableCell>
              <Chip label={status} classes={{root: classes[states[status.toLowerCase()]]}}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
