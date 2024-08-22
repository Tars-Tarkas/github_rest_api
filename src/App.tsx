import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from "./store/githubSlice";
import { RootState, AppDispatch } from "./store";
import { formatDate } from "./utils/utils";
import style from "./App.module.scss";
import type { DataFetchType } from "./types/types";

import Header from "./components/Header/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Details from "./components/Details/Details";
import Container from "@mui/material/Container";
import Footer from "./components/Footer/Footer";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Название",
    align: "left",
    flex: 1,
    disableColumnMenu: true,
    headerAlign: "left",
  },
  {
    field: "language",
    headerName: "Язык",
    align: "left",
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "forks",
    headerName: "Число форков",
    type: "number",
    align: "left",
    flex: 1,
    disableColumnMenu: true,
    headerAlign: "left",
  },
  {
    field: "stargazers_count",
    headerName: "Число звезд",
    align: "left",
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: "updated_at",
    headerName: "Дата обновления",
    type: "string",
    flex: 1,
    disableColumnMenu: true,
    valueFormatter: (value) => formatDate(value),
  },
];

function App() {
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [details, setDetails] = useState<any>({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading }: DataFetchType = useSelector(
    (state: RootState) => state.gs
  );

  /**
   * функция для возврата значения кликнутой строки
   * и заносит его в стейт
   * @param params
   */
  const handleRowClick = (params: { row: {} }) => {
    setDetails(params.row);
  };

  /**
   * обычный юзэффект для наблюдения за поступающими данными
   * следит за диспатчем, текстом запроса, номера страницы, и количества строк на листе
   */
  useEffect(() => {
    if (query !== "") {
      dispatch(
        fetchApi({
          query: query,
          page: paginationModel.page + 1,
          per_page: paginationModel.pageSize,
        })
      );
    }
  }, [dispatch, query, paginationModel]);

  /**
   * фукнция каллбек строки поиска
   * @param value получаем стоку
   */
  const searchValue = (value: string) => {
    setQuery(value);
  };

  /**
   * взято из документации
   * Некоторые клиенты API возвращают значение undefined при загрузке
   * Следующие строки приведены здесь для предотвращения того, чтобы значение `rowCount` не было определено во время загрузки
   */
  const rowCountRef = useRef(data?.total_count || 0);

  const rowCount = useMemo(() => {
    if (data?.total_count !== undefined) {
      rowCountRef.current = data?.total_count;
    }
    return rowCountRef.current;
  }, [data?.total_count]);

  /**
   *
   * @returns возвращает компонет текста сообщения
   */

  const TextMessage = () => (
    <div className={style.text}>
      <p className={style.text_message}>Добро пожаловать</p>
    </div>
  );

  /**
   *
   * @returns возвращает компонент таблицы
   */

  const Table = () => (
    <div className={style.table}>
      <div className={style.table_datagrid}>
        <h3 className={style.table_caption}>Результаты поиска</h3>
        <DataGrid
          rows={data.items}
          columns={columns}
          onRowClick={handleRowClick}
          pageSizeOptions={[5, 10, 20]}
          pagination
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          rowCount={rowCount}
          loading={isLoading}
          sx={{
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderBottom: 0,
            ".MuiDataGrid-columnHeaderTitle": {
              fontFamily: "Roboto",
              fontWeight: 500,
              fontSize: "14px",
            },
            ".MuiDataGrid-cell": {
              fontFamily: "Roboto",
              fontWeight: 400,
              fontSize: "14px",
            },
            ".MuiDataGrid-root": {
              height: "100vh",
            },
            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",
              background: "white",
              width: "auto !important",
            },
            ".MuiDataGrid-sortIcon": {
              opacity: "inherit !important",
              width: "100%",
            },

            ".MuiDataGrid-columnHeaderTitleContainer": {
              flexDirection: "row-reverse !important",
              justifyContent: "flex-end !important",
            },
            ".css-wop1k0-MuiDataGrid-footerContainer": {
              border: "none",
            },
          }}
        />
      </div>
      <Details details={details} />
    </div>
  );

  return (
    <div className={style.App}>
      <Header getValue={searchValue} />{" "}
      <Container
        maxWidth="md"
        sx={{
          height: "100%",
          "&.MuiContainer-maxWidthMd": {
            maxWidth: "1440px",
          },
        }}
      >
        {Object.getOwnPropertyNames(data).length === 0 ? (
          <TextMessage />
        ) : (
          <Table />
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
