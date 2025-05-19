// import { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";

// import Input from "./blocks/input/Input";
// import OutlinedButton from "./blocks/outlined-button/OutlinedButton";

// import "./add-rpd.css";

// import * as api from "./api/api";
// import { useForm } from "react-hook-form";

// const CheckboxLabel = { inputProps: { "aria-label": "Checkbox demo" } };

// interface Discipline {
//   id: number;
//   fullName: string;
//   shortName: string;
//   code: string;
//   catherdra: string;
//   studyField: string;
// }

// interface Topic {
//   id: number;
//   disciplineId: number;
//   topicName: string;
// }

// interface PracticalClass {
//   topicId: number;
//   practicalClassId: number;
//   disciplineId: number;
//   practicalClassName: string;
// }

// interface LaboratoryClass {
//   topicId: number;
//   laboratoryClassId: number;
//   disciplineId: number;
//   laboratoryClassName: string;
// }

// interface Lection {
//   topicId: number;
//   id: number;
//   disciplineId: number;
//   lectionName: string;
// }

// interface ExtTopic {
//   topicId: number;
//   topicName: string;
//   totalHours: number;
//   topicLectionHours: number;
//   topicPracticalClassHours: number;
//   topicLaboratoryClassHours: number;
//   topicSelfstudyHours: number;
// }

// interface InputLection {
//   hours: number;
//   topicIdValue: number;
//   lectionIdValue: number;
// }

// interface InputLaboratoryClass {
//   hours: number;
//   topicIdValue: number;
//   laboratoryClassIdValue: number;
// }

// interface InputPracticalClass {
//   hours: number;
//   topicIdValue: number;
//   practicalClassIdValue: number;
// }

// interface InputSelfStudy {
//   hours: number;
//   topicIdValue: number;
// }

// type TopicsInputValueInitialState = Record<string, Topic | null> | null;
// type LectionsInputValueInitialState = Record<string, Lection | null> | null;
// type LaboratoryClassesValueInitialState = Record<
//   string,
//   LaboratoryClass | null
// > | null;
// type PracticalClassesValueInitialState = Record<
//   string,
//   PracticalClass | null
// > | null;

// type TLectionsInputValue = Record<string, InputLection>;
// type TLaboratoryClassesValue = Record<string, InputLaboratoryClass>;
// type TPracticalClassesValue = Record<string, InputPracticalClass>;
// type TSelfStudyValue = Record<string, InputSelfStudy>;

// export default function AddRpd() {
//   let topicsInputValueInitialState: TopicsInputValueInitialState = null;
//   let laboratoryClassesInputValueInitialState: LaboratoryClassesValueInitialState =
//     null;
//   let practicalClassesInputValueInitialState: PracticalClassesValueInitialState =
//     null;
//   let lectionsInputValueInitialState: LectionsInputValueInitialState = null;
//   let selfStudyInputValueInitialState = {};

//   topicsInputValueInitialState = {};
//   laboratoryClassesInputValueInitialState = {};
//   practicalClassesInputValueInitialState = {};
//   lectionsInputValueInitialState = {};

//   const [discipline, setDiscipline] = useState<string>("");
//   const [year, setYear] = useState<string>("");
//   const [additionalHours, setAdditionalHours] = useState<string>("");
//   const [currentDisciplineId, setCurrentDisciplineId] = useState<number>(0);
//   const [pickedCompetences, setPickedCompetences] = useState<string[] | null>(
//     null
//   );
//   const [laboratoryClassesInputValue, setLaboratoryClassesInputValue] =
//     useState<TLaboratoryClassesValue>({});
//   const [practicalClassesInputValue, setPracticalClassesInputValue] =
//     useState<TPracticalClassesValue>({});
//   const [lectionsInputValue, setLectionsInputValue] =
//     useState<TLectionsInputValue>({});
//   const [selfStudyInputValue, setSelfStudyInputValue] =
//     useState<TSelfStudyValue>({});

//   const [disciplines, setDisciplines] = useState<Discipline[] | null>(null);
//   const [topics, setTopics] = useState<Topic[] | null>(null);
//   const [laboratoryClasses, setLaboratoryClasses] = useState<
//     LaboratoryClass[] | null
//   >(null);
//   const [practicalClasses, setPracticalClasses] = useState<
//     PracticalClass[] | null
//   >(null);
//   const [lections, setLections] = useState<Lection[] | null>(null);
//   const [disciplineCompetences, setDisciplineCompetences] = useState<
//     | {
//         id: string;
//         competenceType: string;
//         competenceCode: string;
//         competenceName: string;
//         indicatorCode: string;
//         indicatorName: string;
//       }[]
//     | null
//   >(null);

//   const { register, handleSubmit } = useForm();

//   const hoursAccumulator = (
//     value: Record<string, { hours: number }> | null
//   ): number => {
//     // console.log(value);
//     return !!value
//       ? Number(
//           Object.values(value).reduce(
//             (acc: number, currentValue: { hours: number }) =>
//               Number(acc) + Number(currentValue.hours),
//             0
//           )
//         )
//       : 0;
//   };

//   console.log(
//     "practicalClassesInputValue",
//     practicalClassesInputValue,
//     "laboratoryClassesInputValue",
//     laboratoryClassesInputValue,
//     "lectionsInputValue",
//     lectionsInputValue,
//     "selfStudyInputValue",
//     selfStudyInputValue,
//     "additionalHours",
//     additionalHours
//   );

//   // console
//   //   .log
//   // "laboratoryClasses",
//   // laboratoryClasses,
//   // "practicalClasses",
//   // practicalClasses
//   // "lections",
//   // lections
//   // ();

//   const totalHours =
//     hoursAccumulator(laboratoryClassesInputValue) +
//     hoursAccumulator(practicalClassesInputValue) +
//     hoursAccumulator(lectionsInputValue) +
//     hoursAccumulator(selfStudyInputValue) +
//     additionalHours;

//   let topicArray: ExtTopic[] = [];

//   !!topics &&
//     topics.map(
//       (topic) =>
//         !!topicArray.length &&
//         topicArray.push({
//           topicId: topic.id,
//           topicName: topic.topicName,
//           totalHours:
//             !!lectionsInputValue &&
//             !!practicalClassesInputValue &&
//             !!laboratoryClassesInputValue &&
//             !!selfStudyInputValue
//               ? Object.values(lectionsInputValue)
//                   .filter((item) => item!.topicIdValue === topic.id)
//                   .reduce(
//                     (acc, currentValue) =>
//                       Number(acc) + Number(currentValue!.hours),
//                     0
//                   ) +
//                 Object.values(practicalClassesInputValue)
//                   .filter((item) => item!.topicIdValue === topic.id)
//                   .reduce(
//                     (acc, currentValue) =>
//                       Number(acc) + Number(currentValue!.hours),
//                     0
//                   ) +
//                 Object.values(laboratoryClassesInputValue)
//                   .filter((item) => item!.topicIdValue === topic.id)
//                   .reduce(
//                     (acc, currentValue) =>
//                       Number(acc) + Number(currentValue!.hours),
//                     0
//                   ) +
//                 Object.values(selfStudyInputValue)
//                   .filter((item) => item.topicIdValue === topic.id)
//                   .reduce(
//                     (acc, currentValue) =>
//                       Number(acc) + Number(currentValue.hours),
//                     0
//                   )
//               : 0,
//           topicLectionHours: !!lectionsInputValue
//             ? Object.values(lectionsInputValue)
//                 .filter((item) => item!.topicIdValue === topic.id)
//                 .reduce(
//                   (acc, currentValue) =>
//                     Number(acc) + Number(currentValue!.hours),
//                   0
//                 )
//             : 0,
//           topicPracticalClassHours: !!practicalClassesInputValue
//             ? Object.values(practicalClassesInputValue)
//                 .filter((item) => item!.topicIdValue === topic.id)
//                 .reduce(
//                   (acc, currentValue) =>
//                     Number(acc) + Number(currentValue!.hours),
//                   0
//                 )
//             : 0,
//           topicLaboratoryClassHours: !!laboratoryClassesInputValue
//             ? Object.values(laboratoryClassesInputValue)
//                 .filter((item) => item!.topicIdValue === topic.id)
//                 .reduce(
//                   (acc, currentValue) =>
//                     Number(acc) + Number(currentValue!.hours),
//                   0
//                 )
//             : 0,
//           topicSelfstudyHours: !!selfStudyInputValue
//             ? Object.values(selfStudyInputValue)
//                 .filter((item) => item.topicIdValue === topic.id)
//                 .reduce(
//                   (acc, currentValue) =>
//                     Number(acc) + Number(currentValue.hours),
//                   0
//                 )
//             : 0,
//         })
//     );

//   const disciplinehHandleChange = (value: string) => {
//     setDiscipline(value);
//   };

//   const yearHandleChange = (value: string) => {
//     setYear(value);
//   };

//   const disciplineClick = (discipline: { id: number }) => {
//     setCurrentDisciplineId(discipline.id);
//   };

//   const getAllDisciplines = async () => {
//     const allDisciplines = await api.getAllDisciplines();
//     setDisciplines([...allDisciplines.data]);
//   };

//   const getAllData = async (currentDisciplineId: number) => {
//     if (currentDisciplineId) {
//       const topics = await api.getAllTopics(currentDisciplineId);
//       const responseLaboratoryClasses = await api.getAllLaboratoryClasses(
//         currentDisciplineId
//       );

//       const responsePracticalClasses = await api.getAllPracticalClasses(
//         currentDisciplineId
//       );
//       const responseLections = await api.getAllLections(currentDisciplineId);
//       const competences = await api.getAllCompetences();
//       const competenceObjects = await api.getDisciplineCompetence(
//         currentDisciplineId
//       );
//       const disciplineCompetences = competenceObjects.data.flatMap(
//         (item: { competenceId: string }) =>
//           competences.data.filter(
//             (competence: { id: string }) => competence.id === item.competenceId
//           )
//       );

//       topics.data.forEach(({ id, disciplineId, topicName }: Topic) => {
//         topicsInputValueInitialState![String(id)] = {
//           id,
//           disciplineId,
//           topicName,
//         };
//       });

//       responseLaboratoryClasses.data.forEach(
//         ({
//           topicId,
//           laboratoryClassId,
//           disciplineId,
//           laboratoryClassName,
//         }: LaboratoryClass) => {
//           laboratoryClassesInputValueInitialState![String(laboratoryClassId)] =
//             {
//               topicId,
//               laboratoryClassId,
//               disciplineId,
//               laboratoryClassName,
//             };
//         }
//       );

//       responsePracticalClasses.data.forEach(
//         ({
//           topicId,
//           practicalClassId,
//           disciplineId,
//           practicalClassName,
//         }: PracticalClass) => {
//           practicalClassesInputValueInitialState![String(practicalClassId)] = {
//             topicId,
//             practicalClassId,
//             disciplineId,
//             practicalClassName,
//           };
//         }
//       );

//       responseLections.data.forEach(
//         ({ topicId, id, disciplineId, lectionName }: Lection) => {
//           lectionsInputValueInitialState![String(id)] = {
//             topicId,
//             id,
//             disciplineId,
//             lectionName,
//           };
//         }
//       );

//       setTopics([...topics.data]);
//       setLaboratoryClasses([...responseLaboratoryClasses.data]);
//       setPracticalClasses([...responsePracticalClasses.data]);
//       setLections([...responseLections.data]);
//       setDisciplineCompetences([...disciplineCompetences]);
//     }
//   };

//   const submitRpd = async () => {
//     await api.addRpd(
//       Number(currentDisciplineId),
//       Number(totalHours),
//       hoursAccumulator(lectionsInputValue),
//       hoursAccumulator(practicalClassesInputValue),
//       hoursAccumulator(laboratoryClassesInputValue),
//       hoursAccumulator(selfStudyInputValue),
//       Number(additionalHours),
//       Number(year)
//     );

//     const rpdId = await api.getUniqueRpd(
//       Number(currentDisciplineId),
//       Number(totalHours),
//       hoursAccumulator(lectionsInputValue),
//       hoursAccumulator(practicalClassesInputValue),
//       hoursAccumulator(laboratoryClassesInputValue),
//       hoursAccumulator(selfStudyInputValue),
//       Number(additionalHours),
//       Number(year)
//     );

//     const topics =
//       !!topicArray &&
//       topicArray.map((item) =>
//         api.addRpdTopic(
//           rpdId.data.id,
//           item.topicId,
//           item.totalHours,
//           item.topicLectionHours,
//           item.topicPracticalClassHours,
//           item.topicLaboratoryClassHours,
//           item.topicSelfstudyHours
//         )
//       );

//     const competences =
//       !!pickedCompetences &&
//       pickedCompetences.map((item) => {
//         api.addRpdCompetence(rpdId.data.id, Number(item));
//       });

//     const laboratoryClasses = Object.values(laboratoryClassesInputValue!).map(
//       (item) =>
//         api.addRpdLaboratoryClass(
//           rpdId.data.id,
//           item.laboratoryClassIdValue,
//           Number(item.hours)
//         )
//     );

//     const practicalClasses = Object.values(practicalClassesInputValue!).map(
//       (item) =>
//         api.addRpdPracticalClass(
//           rpdId.data.id,
//           item.practicalClassIdValue,
//           Number(item.hours)
//         )
//     );

//     const lections =
//       !!lectionsInputValue &&
//       Object.values(lectionsInputValue).map((item) => {
//         api.addRpdLections(
//           rpdId.data.id,
//           item!.lectionIdValue,
//           Number(item!.hours)
//         );
//       });

//     Promise.all([
//       topics,
//       competences,
//       laboratoryClasses,
//       practicalClasses,
//       lections,
//     ]);

//     api
//       .createDocument(rpdId.data.id)
//       .then((res) => res.data)
//       .then((blob) => {
//         // Create blob link to download
//         const url = window.URL.createObjectURL(new Blob([blob]));
//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute("download", `РПД.docx`);

//         // Append to html link element page
//         document.body.appendChild(link);

//         // Start download
//         link.click();

//         // Clean up and remove the link
//         link.parentNode!.removeChild(link);
//       });
//   };

//   const competenceHandler = (competences: string) => {
//     const isItemExist =
//       !!pickedCompetences &&
//       pickedCompetences.filter((item) => competences === item);
//     if (isItemExist) {
//       setPickedCompetences(
//         pickedCompetences.filter((item) => item !== competences)
//       );
//     } else {
//       !!pickedCompetences &&
//         setPickedCompetences([...pickedCompetences, competences]);
//     }
//   };

//   const laboratoryClassHoursHandler = ({
//     name,
//     value,
//   }: {
//     name: string;
//     value: number;
//   }) => {
//     const laboratoryClassHoursTopicId = laboratoryClasses?.find(
//       ({ laboratoryClassName }) => laboratoryClassName === name
//     );

//     const topicIdValue: number = laboratoryClassHoursTopicId?.topicId ?? 0;
//     const laboratoryClassIdValue: number =
//       laboratoryClassHoursTopicId?.laboratoryClassId ?? 0;

//     setLaboratoryClassesInputValue({
//       ...laboratoryClassesInputValue,
//       [name]: { hours: value, topicIdValue, laboratoryClassIdValue },
//     });
//   };

//   const practicalClassHoursHandler = ({
//     name,
//     value,
//   }: {
//     name: string;
//     value: number;
//   }) => {
//     const practicalClassHoursTopicId = practicalClasses?.find(
//       ({ practicalClassName }) => practicalClassName === name
//     );

//     const topicIdValue: number = practicalClassHoursTopicId?.topicId ?? 0;
//     const practicalClassIdValue: number =
//       practicalClassHoursTopicId?.practicalClassId ?? 0;

//     setPracticalClassesInputValue({
//       ...practicalClassesInputValue,
//       [name]: { hours: value, topicIdValue, practicalClassIdValue },
//     });
//   };

//   const lectionsHoursHandler = ({
//     name,
//     value,
//   }: {
//     name: string;
//     value: number;
//   }) => {
//     const lectionHoursTopicId = lections?.find(
//       ({ lectionName }) => lectionName === name
//     );

//     const topicIdValue: number = lectionHoursTopicId?.topicId ?? 0;
//     const lectionIdValue: number = lectionHoursTopicId?.id ?? 0;

//     setLectionsInputValue({
//       ...lectionsInputValue,
//       [name]: { hours: value, topicIdValue, lectionIdValue },
//     });
//   };

//   const selfStudyHoursHandler = ({
//     name,
//     value,
//   }: {
//     name: string;
//     value: number;
//   }) => {
//     const topicIdValue = topics?.find(({ id }) => id === Number(id))!.id;

//     setSelfStudyInputValue({
//       ...selfStudyInputValue,
//       [name]: { hours: value, topicIdValue: topicIdValue! },
//     });
//   };

//   useEffect(() => {
//     getAllDisciplines();
//     getAllData(currentDisciplineId);
//   }, [currentDisciplineId]);

//   return (
//     <div className="add-rpd">
//       <span className="add-rpd__title">Добавление РПД</span>
//       <Box
//         onSubmit={handleSubmit(submitRpd)}
//         component="form"
//         sx={{
//           "& > :not(style)": {
//             m: 1,
//             display: "flex",
//             flexDirection: "column",
//             gap: "30px",
//             marginTop: "15px",
//           },
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         <FormControl sx={{ width: "99%" }}>
//           <InputLabel>Дисциплина</InputLabel>
//           <Select
//             {...register("discipline", { required: true })}
//             id="discipline"
//             value={!!discipline ? discipline : null}
//             label="discipline"
//             onChange={(e) => disciplinehHandleChange(e.target.value!)}
//           >
//             {!!disciplines &&
//               disciplines.map((discipline) => (
//                 <MenuItem
//                   key={discipline.id}
//                   onClick={() => disciplineClick(discipline)}
//                   value={`${discipline.fullName}`}
//                 >
//                   {discipline.fullName}
//                 </MenuItem>
//               ))}
//           </Select>
//         </FormControl>
//         {!discipline && (
//           <span className="add-rpd-form_errors">
//             Дисциплина должна быть выбрана
//           </span>
//         )}
//         <FormControl sx={{ width: "99%" }}>
//           <InputLabel>Год дисциплины</InputLabel>
//           <Select
//             {...register("year", { required: true })}
//             value={year}
//             label="year"
//             onChange={(e) => yearHandleChange(e.target.value)}
//           >
//             <MenuItem value={2023}>2023</MenuItem>
//             <MenuItem value={2022}>2022</MenuItem>
//             <MenuItem value={2021}>2021</MenuItem>
//             <MenuItem value={2020}>2020</MenuItem>
//           </Select>
//         </FormControl>
//         {!year && (
//           <span className="add-rpd-form_errors">
//             Год дисциплины должен быть выбран
//           </span>
//         )}
//         <span className="add-rpd__helper">
//           {"Общее количество часов: " + totalHours}
//         </span>
//         <span className="add-rpd__local-title">Добавление тем</span>
//         {!!topics &&
//           topics.map((topic) => (
//             <div key={topic.id}>
//               <span className="add-rpd__educational-unit">
//                 {
//                   "Тема №" + topic.id + " " + topic.topicName + " "
//                   // +
//                   // "Количество часов: " +
//                   // !!topicArray.length
//                   //   ? topicArray.find((item) => item.topicId === topic.id)!
//                   //       .totalHours
//                   //   : 0
//                 }
//               </span>
//             </div>
//           ))}
//         <div>
//           <span className="add-rpd__local-title">Добавление лекций</span>
//           {!!lections &&
//             lections.map(({ id, topicId, lectionName }) => (
//               <div className=".add-rpd__educational-unit-block" key={id}>
//                 <span className="add-rpd__educational-unit">
//                   {"Тема №" + topicId + " " + id}
//                 </span>
//                 <Input
//                   key={id}
//                   value={
//                     !!lectionsInputValue[lectionName]
//                       ? lectionsInputValue[lectionName]!.hours
//                       : 0
//                   }
//                   register={register(lectionName, {
//                     onChange: (e) => {
//                       console.log(e.target);
//                       lectionsHoursHandler(e.target);
//                     },
//                     required: true,
//                   })}
//                   id="lectionHours"
//                   label="Количество часов"
//                   variant="outlined"
//                 />
//               </div>
//             ))}
//           <span className="add-rpd__helper">
//             {"Лекционных часов: " + hoursAccumulator(lectionsInputValue!)}
//           </span>
//         </div>
//         <div>
//           <span className="add-rpd__local-title">
//             Добавление лабораторных занятий
//           </span>
//           {!!laboratoryClasses &&
//             laboratoryClasses.map(
//               ({ laboratoryClassId, topicId, laboratoryClassName }) => (
//                 <div key={laboratoryClassId}>
//                   <span className="add-rpd__educational-unit">
//                     {"Тема №" + topicId + " " + laboratoryClassName}
//                   </span>
//                   <Input
//                     key={laboratoryClassId}
//                     value={
//                       laboratoryClassesInputValue[laboratoryClassName]
//                         ? laboratoryClassesInputValue[laboratoryClassName]!
//                             .hours
//                         : ""
//                     }
//                     register={register(laboratoryClassName, {
//                       onChange: (e) => laboratoryClassHoursHandler(e.target),
//                       required: true,
//                     })}
//                     id="laboratoryClassHours"
//                     label="Количество часов"
//                     variant="outlined"
//                   />
//                 </div>
//               )
//             )}
//           <span className="add-rpd__helper">
//             {"Лабораторных часов: " +
//               hoursAccumulator(laboratoryClassesInputValue)}
//           </span>
//         </div>
//         <div>
//           <span className="add-rpd__local-title">
//             Добавление практических занятий
//           </span>
//           {!!practicalClasses &&
//             practicalClasses.map(
//               ({ practicalClassId, topicId, practicalClassName }) => (
//                 <div key={practicalClassId}>
//                   <span className="add-rpd__educational-unit">
//                     {"Тема №" + topicId + " " + practicalClassName}
//                   </span>
//                   <Input
//                     key={practicalClassId}
//                     value={
//                       practicalClassesInputValue[practicalClassName]
//                         ? practicalClassesInputValue[practicalClassName]!.hours
//                         : ""
//                     }
//                     register={register(practicalClassName, {
//                       onChange: (e) => practicalClassHoursHandler(e.target),
//                       required: true,
//                     })}
//                     id="practicalClassHours"
//                     label="Количество часов"
//                     variant="outlined"
//                   />
//                 </div>
//               )
//             )}
//         </div>
//         <span className="add-rpd__helper">
//           {"Практических часов: " +
//             hoursAccumulator(practicalClassesInputValue)}
//         </span>
//         <div>
//           <span className="add-rpd__local-title">
//             Добавление самостоятельной работы студента
//           </span>
//           {!!topics &&
//             topics.map(({ id, topicName }) => (
//               <div key={id}>
//                 <span className="add-rpd__educational-unit">
//                   {"Тема №" + id + " Самостоятельная работа"}
//                 </span>
//                 <Input
//                   key={id}
//                   value={
//                     !!selfStudyInputValue[topicName]
//                       ? selfStudyInputValue[topicName].hours
//                       : ""
//                   }
//                   register={register(topicName, {
//                     onChange: (e) => selfStudyHoursHandler(e.target),
//                     required: true,
//                   })}
//                   id="selfStudyHours"
//                   label="Количество часов"
//                   variant="outlined"
//                 />
//               </div>
//             ))}
//           <span className="add-rpd__helper">
//             {"Количество часов на самостоятельную работу: " +
//               selfStudyInputValue}
//           </span>
//         </div>
//         <div>
//           <span className="add-rpd__local-title">Добавление контроля</span>
//           <div>
//             <span className="add-rpd__educational-unit">
//               Количество часов на контроль
//             </span>
//             <Input
//               value={additionalHours ? additionalHours : ""}
//               register={register("additionalHours", {
//                 onChange: (e) => setAdditionalHours(e.target.value),
//                 required: true,
//               })}
//               id="additionalHours"
//               label="Количество часов"
//               variant="outlined"
//             />
//           </div>
//           <span className="add-rpd__helper">
//             {"Часы на контроль: " + additionalHours}
//           </span>
//         </div>

//         <div>
//           <span className="add-rpd__local-title">Добавление компетенций</span>
//           {!!disciplineCompetences &&
//             disciplineCompetences.map((competence) => (
//               <div
//                 className="add-rpd__education-unit-competence"
//                 key={competence.id}
//               >
//                 <Checkbox
//                   onChange={(e) => competenceHandler(e.target.value)}
//                   value={competence.id}
//                   {...CheckboxLabel}
//                 />
//                 {competence.competenceType}
//                 <br />
//                 {competence.competenceCode}
//                 {competence.competenceName}
//                 <br />
//                 {competence.indicatorCode}
//                 {competence.indicatorName}
//                 <br />
//               </div>
//             ))}
//         </div>
//         <OutlinedButton type="submit" text="Добавить РПД" />
//       </Box>
//     </div>
//   );
// }
