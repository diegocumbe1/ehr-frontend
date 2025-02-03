import useDeleteConfirmation from "@/utils/hooks/useDeleteConfirmation";
import { BsArrowBarDown, BsDownload } from "react-icons/bs";
import {
  HiOutlineChevronRight,
  HiPencilSquare,
  HiTrash,
} from "react-icons/hi2";
//TODO: anñadir la funcionalidad de traducción
type Column<T = any> = {
  header: string;
  accessor: string | ((row: T) => any);
};

type DataTableProps<T extends Record<string, any> = any> = {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  type?: "tb1" | "tb2" | "tb3";
};


const DataTable = <T extends Record<string, any>>({ columns, data, onRowClick, type }: DataTableProps<T>) => {

  console.log('columns -->',columns)
  const handleDelete = (rowId: string) => {
    // Your delete logic, e.g., API request
    console.log(`Deleting row with ID: ${rowId}`);
  };

  // Hook initialized outside the loop
  const { showDeleteConfirmAlert } = useDeleteConfirmation();

  return (
    <div className="overflow-x-auto  p-4 bg-white">
      <div className="bg-zinc-100 h-20 flex items-center justify-between rounded-lg px-4">
        {/* <div className="flex items-center">
          <select className="bg-zinc-50 w-72 h-9 rounded-md text-center border border-gray-300">
            <option value="some">Search location</option>
          </select>
          <button
            className="mx-3 text-white bg-blue-800 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1"
            type="button"
          >
            Submit
          </button>
        </div> */}
        <button
          className="flex items-center text-white bg-black hover:bg-slate-800 font-bold rounded-lg text-sm px-3 py-1"
          type="button"
        >
          <BsDownload />
          <span className="ml-2">Download</span>
        </button>
      </div>

      <table className="mt-5 w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-zinc-100 text-gray-700">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-2 text-center ${
                  index === 0 ? "rounded-tl-lg" : ""
                } ${index === columns.length - 1 ? "rounded-tr-lg" : ""}`}
              >
                {column.header}
              </th>
            ))}

            {/* Columna extra si es guestList */}
            {type === "tb1" && <th className="px-4 py-2 text-center"></th>}
            {/* Columna extra si es guestList */}
            {type === "tb2" && (
              <th className="px-4 py-2 text-center">Detail</th>
            )}
            {/* Columna extra si es guestList */}
            {type === "tb3" && (
              <th className="px-4 py-2 text-center">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const confirmAdnDelete = () => {
              showDeleteConfirmAlert(() => handleDelete((row as any).id));
            };
            return (
              <tr
                key={rowIndex}
                className="hover:bg-gray-200 cursor-pointer border-b border-gray-300"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} className="px-4 py-2 text-center">
                    {typeof column.accessor === "function"
                      ? column.accessor(row)
                      : row[column.accessor]}
                  </td>
                ))}

                {/* Botones dinámicos en guestList tb2 */}
                {type === "tb1" && (
                  <td className="px-4">
                    <div className="flex justify-start items-center">
                      <button
                        className="px-1 bg-white rounded-r-lg shadow-lg border-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("See more:");
                        }}
                      >
                        <HiOutlineChevronRight />
                      </button>
                    </div>
                  </td>
                )}
                {/* Botones dinámicos en guestList tb2 */}
                {type === "tb2" && (
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        className="flex items-center gap-1 text-[#441893] hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("See more:", row);
                        }}
                      >
                        See more
                        <HiOutlineChevronRight className="text-[#441893]" />
                      </button>
                    </div>
                  </td>
                )}
                {/* Botones dinámicos en guestList tb3 */}
                {type === "tb3" && (
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center items-center gap-3">
                      {/* Botón de Edit */}
                      <button
                        className="flex items-center gap-1 text-[#441893] hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Edit:", row);
                        }}
                      >
                        <HiPencilSquare className="text-[#441893]" />
                        Edit
                      </button>
                      <span className="text-[#441893] "> / </span>
                      {/* DELETE BUTTON */}
                      <button
                        className="flex items-center gap-1 text-[#441893] hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmAdnDelete();
                        }}
                      >
                        Delete
                        <HiTrash className="text-[#441893]" />
                      </button>
                      <span className="text-[#441893] "> / </span>
                      <button
                        className="flex items-center gap-1 text-[#441893] hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("See more:", row);
                        }}
                      >
                        See more
                        <HiOutlineChevronRight className="text-[#441893]" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="mt-3 flex justify-center">
        <button className="px-3 py-1 bg-gray-200 text-sm rounded-l-lg">
          {"<"}
        </button>
        <button className="px-3 py-1 bg-gray-300">1</button>
        <button className="px-3 py-1 bg-gray-200">2</button>
        <button className="px-3 py-1 bg-gray-200 rounded-r-lg">{">"}</button>
      </div>
    </div>
  );
};

export default DataTable;
