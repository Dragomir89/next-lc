import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getRequest } from "../../utils/requests";
import {
  addLabelToDropdownFields,
  fomatOffersTableData,
  createQueryStr,
  onChangeAutocomplete,
  getSelectetLabels,
} from "../../utils/functions";
import { TablePagination, TextField } from "@mui/material";
import DropdownFields from "../../components/common/DropdownFields";
import { DatePicker } from "@mui/x-date-pickers";
import SerchButton from "../../components/common/SerchButton";
import { CircularProgressContext } from "../../context/CircularProgressContext";

function ShowOffers(props) {
  const { showProgressAction, hideProgressAction } = useContext(
    CircularProgressContext
  );

  const { push } = useRouter();

  const { offers, count, query, options, selectedLabels } = props;

  const { constructionTypes, neighborhoods, propertyTypes, states, brokers } =
    options;

  const [constructionType, setConstructionTypes] = useState(
    selectedLabels.constructionType
  );
  const [propertyType, setPropertyType] = useState(selectedLabels.propertyType);
  const [state, setStates] = useState(selectedLabels.state);
  const [neighborhood, setNeighborhoods] = useState(
    selectedLabels.neighborhood
  );
  const [broker, setBroker] = useState(selectedLabels.broker);

  const [phoneNumber, setphoneNumber] = useState(selectedLabels.phoneNumber);

  const [nextCall, setNextCall] = useState(
    dayjs(new Date(selectedLabels.nextCall))
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    query.rows ? Number(query.rows) : 10
  );

  useEffect(() => {
    hideProgressAction();
  }, [offers]);

  const columns = [
    { id: "propertyType", label: "Вид Имот", minWidth: 70 },
    { id: "state", label: "Състояние", minWidth: 70 },
    {
      id: "constructionType",
      label: "Вид строителство",
      minWidth: 70,
      align: "left",
    },
    {
      id: "neighborhood",

      label: "Квартал",
      minWidth: 70,
      align: "left",
    },
    {
      id: "area",
      label: "Площ \u00a0(кв\u00b2)",
      minWidth: 70,
      align: "right",
      format: (value) => {
        return value + " кв";
      },
    },
    {
      id: "price",
      label: "Цена (евро)",
      minWidth: 70,
      align: "right",
      format: (value) => {
        return value + " \u20AC";
      },
    },
    {
      id: "address",
      label: "Адрес",
      minWidth: 170,

      align: "right",
    },
  ];

  function redirectOffersPage(page, rowsPerPage) {
    const query = createQueryStr(
      constructionTypes,
      constructionType,
      neighborhoods,
      neighborhood,
      propertyTypes,
      propertyType,
      states,
      state,
      rowsPerPage
    );
    push(`/show-offers/${page}${query}`);
  }

  const handleChangePage = (event, newPage) => {
    showProgressAction();
    setPage(newPage);
    redirectOffersPage(++newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    showProgressAction();
    const rowsPerPage = event.target.value;
    setRowsPerPage(rowsPerPage);
    setPage(0);
    let newPage = page;
    redirectOffersPage(++newPage, rowsPerPage);
  };

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setphoneNumber(value);
  };

  const handleClickSearch = () => {
    const query = createQueryStr(
      constructionTypes,
      constructionType,
      neighborhoods,
      neighborhood,
      propertyTypes,
      propertyType,
      states,
      state,
      rowsPerPage,
      brokers,
      broker,
      phoneNumber,
      nextCall
    );

    setPage(0);
    push(`/show-offers/${1}${query}`);
    // hideProgressAction();
  };

  const fieldPadding = "5px";
  return (
    <div style={{ marginTop: "30px" }}>
      <div style={{ width: "1440px", overflow: "hidden", margin: "0 auto" }}>
        <div style={{ display: "flex" }}>
          <DropdownFields
            brokers={brokers}
            broker={broker}
            onChangeAutocomplete={(e, value) => {
              onChangeAutocomplete(
                e,
                value,
                setConstructionTypes,
                setPropertyType,
                setStates,
                setNeighborhoods,
                setBroker
              );
            }}
            constructionType={constructionType}
            constructionTypes={constructionTypes}
            propertyTypes={propertyTypes}
            propertyType={propertyType}
            states={states}
            state={state}
            neighborhoods={neighborhoods}
            neighborhood={neighborhood}
          />
          <SerchButton handleClickSearch={handleClickSearch} />
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ padding: fieldPadding, width: "300px" }}>
            <TextField
              id={"phoneNumber"}
              style={{ marginBottom: "5px" }}
              label={"Телефон"}
              fullWidth
              value={phoneNumber}
              onChange={onChangeInput}
            />
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div style={{ marginBottom: "5px", padding: fieldPadding }}>
                <DatePicker
                  value={nextCall}
                  onChange={setNextCall}
                  className="test"
                  label={"Следващо Обаждане"}
                  openTo="month"
                  views={["year", "month", "day"]}
                />
              </div>
            </LocalizationProvider>
          </div>
        </div>

        <TableContainer sx={{ maxHeight: 1440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.map(fomatOffersTableData).map((row) => {
                return (
                  <TableRow
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showProgressAction();
                      push(`/edit-offer/${row.id}`);
                    }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const defaultDate = new Date().toISOString().split("T")[0];

  const propsQuery = `&nextCall=${
    query.nextCall || defaultDate
  }&constructionTypeId=${query.constructionTypeId || ""}&neighborhoodId=${
    query.neighborhoodId || ""
  }&propertyTypeId=${query.propertyTypeId || ""}&state=${
    query.state || ""
  }&brokerId=${query.brokerId || ""}&phoneNumbers=${query.phoneNumber || ""}`;

  function createQuery() {
    return `?page=${query.page}&rows=${
      query.rows ? query.rows : 10
    }${propsQuery}`;
  }
  const { offers, count } = await getRequest("/api/get-offers" + createQuery());

  let options = await getRequest("/api/get-all-opitions");
  options = addLabelToDropdownFields(options);

  const selectedLabels = getSelectetLabels(options, query);

  selectedLabels.nextCall = selectedLabels.nextCall
    ? selectedLabels.nextCall
    : defaultDate;
  return { props: { offers, count, query, options, selectedLabels } };
}

export default ShowOffers;
