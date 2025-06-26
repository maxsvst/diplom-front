import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { LaboratoryClass, Lection, PracticalClass } from "../../types";
import { NestedRowItem } from "../nested-row-item/NestedRowItem";

type IdKey =
  | "laboratoryClassId"
  | "lectionId"
  | "practicalClassId"
  | "examQuestionid";

type NameKey =
  | "laboratoryClassName"
  | "lectionName"
  | "practicalClassName"
  | "examQuestionName";

type RowType = LaboratoryClass | Lection | PracticalClass;



export default function NestedRow<T extends RowType>({
  nestedRow,
  fields,
  labels,
  type,
  topicId,
}:
  {
    nestedRow: T[] | null;
    fields: [IdKey, NameKey];
    labels: string[];
    type: 'practicalClass' | 'lection' | 'laboratoryClass'
    topicId: string
  }
) {

  const [id, name] = fields

  return (
    <Box sx={{ padding: 0 }}>
      <Typography variant="h5" gutterBottom component="div" sx={{ marginLeft: 1, marginTop: 2 }}>
        {labels[0]}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>{labels[1]}</b>
            </TableCell>
            <TableCell align="right" colSpan={2}>
              <b>Количество часов</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ margin: 0 }}>
          {nestedRow && (
            <TableCell colSpan={3} sx={{ padding: 3 }}>
              <ol style={{ paddingRight: 1 }}>
                {nestedRow.map((row: T) => (
                  <NestedRowItem
                    key={String((row as any)[id])}
                    row={row}
                    fields={fields}
                    type={type}
                    topicId={topicId}
                  />
                ))}
              </ol>
            </TableCell>
          )}
        </TableBody>
      </Table>
    </Box >
  );
}
