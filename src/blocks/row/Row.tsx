import { useState } from "react";
import { useSelector } from "react-redux";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { RootState } from "../../app/store";
import { LaboratoryClass, Lection, PracticalClass, Topic } from "../../types";

import NestedRow from "../nested-row/NestedRow";

export default function Row({ row }: { row: Partial<Topic> }) {
  const { laboratoryClasses, practicalClasses, lections } = useSelector(
    (state: RootState) => state.rpd
  );
  const [open, setOpen] = useState(false);

  const { topicId } = row;

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.topicName}</TableCell>
        <TableCell component="th" scope="row">
          {row.topicId}
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {laboratoryClasses && (
              <NestedRow<LaboratoryClass>
                nestedRow={laboratoryClasses[topicId!]}
                fields={["laboratoryClassId", "laboratoryClassName"]}
                labels={["Лабораторные занятия", "Название ЛЗ"]}
              />
            )}
            {practicalClasses && (
              <NestedRow<PracticalClass>
                nestedRow={practicalClasses[topicId!]}
                fields={["practicalClassId", "practicalClassName"]}
                labels={["Практические занятия", "Название ПЗ"]}
              />
            )}
            {lections && (
              <NestedRow<Lection>
                nestedRow={lections[topicId!]}
                fields={["lectionId", "lectionName"]}
                labels={["Лекционные занятия", "Название лекции"]}
              />
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
