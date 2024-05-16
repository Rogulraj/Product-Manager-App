// packages
import React, {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SearchOutlined } from "@ant-design/icons";
import type {
  InputRef,
  TableColumnsType,
  TableColumnType,
  TableProps,
} from "antd";
import { Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import randomColor from "randomcolor";

// css
import ds from "./ProductTable.module.css";

// redux
import { ProductItem } from "@redux/features/products.feature";

// components
import TableRowEditModal from "@components/Modals/TableRowEditModal/TableRowEditModal";
import TableRowDeleteModal from "@components/Modals/TableRowDeleteModal/TableRowDeleteModal";

// types
interface ProductTablePropsType {
  productList: ProductItem[];
  categoryList: string[];
}

interface DataSourceType extends ProductItem {
  style?: CSSProperties;
}

interface PaginationType {
  current: number;
  pageSize: number;
}

type DataIndex = keyof DataSourceType;

type OnChange = NonNullable<TableProps<DataSourceType>["onChange"]>;

const ProductTable: FC<ProductTablePropsType> = ({
  categoryList,
  productList,
}) => {
  /** state's */
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [currPagination, setCurrPagination] = useState<PaginationType>({
    current: 1,
    pageSize: 10,
  });

  /** ref's */
  const searchInput = useRef<InputRef>(null);

  /** table search handler */
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  /** table reset handler */
  const handleReset = (
    clearFilters: () => void,
    confirm: FilterDropdownProps["confirm"]
  ) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
    confirm();
  };

  /** table filter & sort option provider */
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataSourceType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  /** row style provider */
  const getRowStyle = () => {
    const color = randomColor({
      luminosity: "light",
      format: "rgba",
      alpha: 0.2,
    });
    return { backgroundColor: color };
  };

  /** applying style to the each row */
  const applyRowStyles = useCallback(() => {
    categoryList.forEach((item) => {
      const nodes = document.querySelectorAll(`.row_${item.toLowerCase()}`);
      const rowStyle = getRowStyle();

      nodes.forEach((item) => {
        item.style.backgroundColor = "";
        item.style.backgroundColor = rowStyle.backgroundColor;
      });
    });
  }, []);

  /**  handling table properties data change*/
  const handleChange: OnChange = (pagination) => {
    setCurrPagination({
      current: pagination.current as number,
      pageSize: pagination.pageSize as number,
    });
  };

  /** defining column of the table */
  const columns: TableColumnsType<DataSourceType> = useMemo(() => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...getColumnSearchProps("name"),
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ...getColumnSearchProps("description"),
        width: "40%",
        ellipsis: true,
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        filters: categoryList.map((item) => {
          return {
            text: item,
            value: item,
          };
        }),
        onFilter: (value, record) => record.category.includes(value as string),
        ellipsis: true,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        ellipsis: true,
      },
      {
        title: "Operation",
        dataIndex: "operation",
        render: (_, record) => {
          return (
            <div className={ds.table_operation_card} key={record.key}>
              <TableRowEditModal productData={record} />
              <TableRowDeleteModal productData={record} />
            </div>
          );
        },
      },
    ];
  }, [productList]);

  /** table data source */
  const dataSource: DataSourceType[] = useMemo(
    () => productList,
    [productList]
  );

  useEffect(() => {
    applyRowStyles();
  }, [productList, categoryList, currPagination]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      scroll={{ x: 800, y: 550 }}
      onChange={handleChange}
      rowClassName={(record) => {
        return `row_${record.category.toLowerCase()}`;
      }}
    />
  );
};

export default ProductTable;
