import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Collapse from "@mui/material/Collapse";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { RootState } from "../../app/store";
import { LaboratoryClass, Lection, PracticalClass, Topic } from "../../types";

import NestedRow from "../nested-row/NestedRow";
import { Input } from "@mui/material";
import { setHours } from "../../app/slices/rpdSlice";

export default function Row({ row }: { row: Partial<Topic> }) {
  const { laboratoryClasses, practicalClasses, lections, topicHours, selfStudyHours, additionalHours } = useSelector(
    (state: RootState) => state.rpd
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { topicId } = row;

  const handleHoursChange =
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
      const newHours = Number(event.target.value);

      if (isNaN(newHours)) {
        dispatch(setHours({ topicId, [type]: type, hours: 0 } as any));
        return;
      }

      dispatch(setHours({ topicId, [type]: type, hours: newHours } as any));
    }

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.topicName}</TableCell>
        <TableCell component="th" align="right">
          {topicHours[row.topicId!]}
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow >
      <TableRow >
        <TableCell style={{ padding: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {laboratoryClasses && (
              <NestedRow<LaboratoryClass>
                nestedRow={laboratoryClasses[topicId!]}
                fields={["laboratoryClassId", "laboratoryClassName"]}
                labels={["Лабораторные занятия", "Название ЛЗ"]}
                type="laboratoryClass"
                topicId={topicId!}
              />
            )}
            {practicalClasses && (
              <NestedRow<PracticalClass>
                nestedRow={practicalClasses[topicId!]}
                fields={["practicalClassId", "practicalClassName"]}
                labels={["Практические занятия", "Название ПЗ"]}
                type="practicalClass"
                topicId={topicId!}
              />
            )}
            {lections && (
              <NestedRow<Lection>
                nestedRow={lections[topicId!]}
                fields={["lectionId", "lectionName"]}
                labels={["Лекционные занятия", "Название лекции"]}
                type="lection"
                topicId={topicId!}
              />
            )}
            <Box sx={{ margin: 0 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Часы на самообучение</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Количество часов</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell colSpan={3}>
                    <TableRow
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <TableCell sx={{ borderBottom: 0 }}>Часы на самообучение</TableCell>
                      <Input
                        type="number"
                        value={selfStudyHours[topicId!]}
                        onChange={(e) => handleHoursChange(e, 'selfStudy')}
                        placeholder="Введите часы"
                      />
                    </TableRow>
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ margin: 0 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Дополнительные часы</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Количество часов</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell colSpan={3}>
                    <TableRow
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <TableCell sx={{ borderBottom: 0 }}>Дополнительные часы</TableCell>
                      <Input
                        type="number"
                        value={additionalHours[topicId!]}
                        onChange={(e) => handleHoursChange(e, 'additionalHours')}
                        placeholder="Введите часы"
                      />
                    </TableRow>
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
