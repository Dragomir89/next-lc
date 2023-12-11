import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getRequest } from "../../utils/requests";
import {
  addLabelToDropdownFields,
  fomatOffersTableData,
  getIdsByLabels,
} from "../../utils/functions";
import { Button, TablePagination, TextField } from "@mui/material";
import DropdownFields from "../../components/common/DropdownFields";
import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
const SearchButton = styled(Button)({
  height: "55px",
  width: "240px",
});

function ShowOffers(props) {
  const { push } = useRouter();

  const [open, setOpen] = useState(false);

  const { offers, count, query, options } = props;

  useEffect(() => {
    setOpen(false);
  }, [offers]);

  const { constructionTypes, neighborhoods, propertyTypes, states } = options;

  const [constructionType, setConstructionTypes] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [state, setStates] = useState(null);
  const [neighborhood, setNeighborhoods] = useState(null);

  const [phoneNumber, setphoneNumber] = useState("");
  const [nextCall, setNextCall] = useState(dayjs(new Date()));

  const onChangeAutocomplete = (e, values) => {
    if (!e) {
      return;
    }
    const id = e.target.id.split("-")[0];
    switch (id) {
      case "constructionType":
        setConstructionTypes(values);
        break;
      case "propertyType":
        setPropertyType(values);
        break;
      case "state":
        setStates(values);
        break;
      case "neighborhood":
        setNeighborhoods(values);
        break;
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    query.rows ? Number(query.rows) : 10
  );

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
    push(`/show-offers/${page}?rows=${rowsPerPage}`);
  }

  const handleChangePage = (event, newPage) => {
    setOpen(true);
    setPage(newPage);
    redirectOffersPage(++newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setOpen(true);
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
    const { constructionTypeId, neighborhoodId, propertyTypeId, stateId } =
      getIdsByLabels(
        constructionTypes,
        constructionType,
        neighborhoods,
        neighborhood,
        propertyTypes,
        propertyType,
        states,
        state
      );

    const searchObj = {
      constructionTypeId,
      neighborhoodId,
      propertyTypeId,
      stateId,
      phoneNumber,
      nextCall: new Date(nextCall?.$d).toISOString(),
    };
    setOpen(true);
    console.log(searchObj);
  };

  const fieldPadding = "5px";
  return (
    <div style={{ marginTop: "30px" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ width: "1440px", overflow: "hidden", margin: "0 auto" }}>
        <div style={{ display: "flex" }}>
          <DropdownFields
            onChangeAutocomplete={onChangeAutocomplete}
            constructionType={constructionType}
            constructionTypes={constructionTypes}
            propertyTypes={propertyTypes}
            propertyType={propertyType}
            states={states}
            state={state}
            neighborhoods={neighborhoods}
            neighborhood={neighborhood}
          />
          <div style={{ marginTop: "5px" }}>
            <SearchButton
              variant="contained"
              size="large"
              onClick={handleClickSearch}
            >
              ТЪРСИ
            </SearchButton>
          </div>
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
                      setOpen(true);
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
  function createQuery() {
    return `?page=${query.page}&rows=${query.rows ? query.rows : 10}`;
  }
  const { offers, count } = await getRequest("/api/get-offers" + createQuery());

  let options = await getRequest("/api/get-all-opitions");
  options = addLabelToDropdownFields(options);

  return { props: { offers, count, query, options } };
}

export default ShowOffers;
