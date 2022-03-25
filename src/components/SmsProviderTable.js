import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useSms } from "../context/SmsContext";
import { columns } from "../tableCol/columns";

function SmsProviderTable() {
  const { setSelectedSmsProviderId, smsProvider, currentPage, setCurrentPage } =
    useSms();

  //overflow contents fixed
  const rowStyle = {
    overflowWrap: "break-word",
    verticalAlign: "baseline",
  };

  const selectRow = {
    mode: "radio",
    bgColor: "#D885A3",
    clickToSelect: true,
    onSelect: (row, isSelect) => {
      const { id } = row;
      setSelectedSmsProviderId(isSelect ? id : null);
    },
  };

  const options = {
    page: currentPage,
    onPageChange: (page) => {
      setCurrentPage(page);
    },
  };

  return (
    <div>
      {smsProvider && smsProvider.length > 0 && (
        <BootstrapTable
          keyField="id"
          hover
          rowStyle={rowStyle}
          data={smsProvider}
          columns={columns}
          pagination={paginationFactory(options)}
          selectRow={selectRow}
        />
      )}
    </div>
  );
}

export default SmsProviderTable;
