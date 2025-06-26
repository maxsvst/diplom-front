import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Input } from "@mui/material";
import { debounce } from 'lodash';

import { LaboratoryClass, Lection, PracticalClass } from "../../types";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHours } from "../../app/slices/rpdSlice";
import { RootState } from "../../app/store";

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

interface NestedRowItemProps<T extends RowType> {
    row: T;
    fields: [IdKey, NameKey];
    type: 'laboratoryClass' | 'lection' | 'practicalClass';
    topicId: string;
}

export function NestedRowItem<T extends RowType>({ row, fields, type, topicId }: NestedRowItemProps<T>) {
    const dispatch = useDispatch();
    const [id, name] = fields;

    const classId = String((row as any)[id]);
    const initialHours = useSelector((state: RootState) => {
        switch (type) {
            case 'laboratoryClass':
                return state.rpd.laboratoryClassHours[topicId]?.[classId] || 0;
            case 'lection':
                return state.rpd.lectionsHours[topicId]?.[classId] || 0;
            case 'practicalClass':
                return state.rpd.practicalClassHours[topicId]?.[classId] || 0;
            default:
                console.warn("Unknown type in NestedRowItem:", type);
                return 0;
        }
    });

    const [localHours, setLocalHours] = useState(String(initialHours));

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const newHours = event.target.value; // Use the raw string value
            setLocalHours(newHours); // Update local state immediately

            const parsedHours = Number(newHours); // Parse the number for dispatch
            if (isNaN(parsedHours)) {
                dispatch(setHours({ topicId, [`${type}Id`]: classId, hours: 0 } as any));
                return;
            }

            dispatch(setHours({ topicId, [`${type}Id`]: classId, hours: parsedHours } as any));
        },
        [dispatch, topicId, type, id, row]
    );

    return (
        <li key={String((row as any)[id])}>
            <TableRow
                sx={{
                    display: "flex",
                    justifyContent: "space-between",

                }}

            >
                <TableCell sx={{ borderBottom: 0 }}> {(row as any)[name]}</TableCell>
                <Input
                    type="number"
                    value={localHours}
                    onChange={handleChange}
                    placeholder="Введите часы"
                />
            </TableRow>
        </li >
    );
}