import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { LaboratoryClass, Lection, PracticalClass } from "../../types";

type RowType = LaboratoryClass | Lection | PracticalClass;

export function useHoursValue<T extends RowType>(topicId: string, id: string, type: 'laboratoryClass' | 'lection' | 'practicalClass', row: T): string {
    const classId = String((row as any)[id]);

    const laboratoryHours = useSelector((state: RootState) => state.rpd.laboratoryClassHours[topicId]?.[classId]);
    const lectionHours = useSelector((state: RootState) => state.rpd.lectionsHours[topicId]?.[classId]);
    const practicalHours = useSelector((state: RootState) => state.rpd.practicalClassHours[topicId]?.[classId]);

    let hours: number | undefined;

    switch (type) {
        case 'laboratoryClass':
            hours = laboratoryHours;
            break;
        case 'lection':
            hours = lectionHours;
            break;
        case 'practicalClass':
            hours = practicalHours;
            break;
        default:
            console.warn("Unknown type in getHoursValue:", type);
            return '';
    }

    return hours === undefined ? '' : String(hours);
}