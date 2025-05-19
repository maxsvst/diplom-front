import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";

import { LaboratoryClass, Lection, PracticalClass } from "../../types";

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
}: {
  nestedRow: T[] | null;
  fields: [IdKey, NameKey];
  labels: string[];
}) {
  const [id, name] = fields;

  console.log(nestedRow);
  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        {labels[0]}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>{labels[1]}</b>
            </TableCell>
            <TableCell align="right">
              <b>Количество часов</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nestedRow && (
            <ol style={{ width: "100%" }}>
              {nestedRow!.map((row: T) => (
                <li key={String((row as any)[id]) + String((row as any)[name])}>
                  <TableRow
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <TableCell>{(row as any)[name]}</TableCell>
                    <Input />
                  </TableRow>
                </li>
              ))}
            </ol>
          )}
        </TableBody>
      </Table>
    </Box>
  );
}
