// "use client";
// import { fetchData } from "@/utils/apiClient";
// import DataTable from "@/components/shared/DataTable";
// import Title from "@/components/shared/Title";
// import { useTranslations } from "next-intl";
// import React, { useEffect, useState } from "react";

// const GuestList = () => {
//   const t = useTranslations("GuestList");
//   const [data, setData] = useState([]);
//   const columns = [
//     { header: `${t("Name")}`, accessor: "name" },
//     { header:`${t("Last Name")}`, accessor: "lastName" },
//     { header:`${t("Phone")}`, accessor: "phone" },
//     { header:`${t("Role")}`, accessor: (row: User) => row.role ? row.role.name : "-" },
//   ];
//   useEffect(() => {
//     const loadLocations = async () => {
//       try {
//         const locations = await fetchData("guest-list");
//         setData(locations);
//       } catch (error) {
//         console.error("Error fetching guest list:", error);
//       }
//     };
//     loadLocations();
//   }, []);
//   return (
//     <div className="p-4 lg:p-8">
//       <Title text={t("title")} />
//       <DataTable columns={columns} data={data} type="tb3" />
//     </div>
//   );
// };

// export default GuestList;
