import * as React from "react";
import ReactTable from "react-table";
import * as matchSorter from "match-sorter";
import {InterceptForm} from "./../components/Intercept_Components/index";
import {InterceptAllButton} from './../components/InterceptAllButton'
import {Switch} from './Switch'
export interface RequestObj {
  requests: Array<chrome.webRequest.WebRequestDetails>;
  handleCheckToggle: React.ChangeEvent<HTMLInputElement>;
  handleCheckedRequests: React.MouseEventHandler<HTMLButtonElement>;
  handleRespTextChange: React.FormEvent<HTMLInputElement>;
  handleStatusCodeChange: React.FormEvent<HTMLSelectElement>;
  checkedReqs: object;
  responseText: object;
  statusCodes: object;
  handleContentTypeChange: React.FormEvent<HTMLSelectElement>;
  contentType: object;
  PageDetails: object;
  handlePaginationChange: React.MouseEvent<HTMLButtonElement>;
  tabId: number;
  clearRequests:React.ChangeEvent<HTMLButtonElement>;
  disableInterceptor:React.ChangeEvent<HTMLButtonElement>;
  updateInterceptorStatus:React.ChangeEvent<HTMLButtonElement>;
}
const RequestList = (props: RequestObj) => {
  const columns = [
    {
      Header: "Request URL",
      accessor: "url",
      Cell: ({original}) => <div className="url" title={original.url}>{original.url}</div>,
      filterable: true,
      filterMethod: (filter, rows) => {
        return matchSorter(rows, filter.value, {
          keys: ["url"],
          threshold: matchSorter.rankings.CONTAINS
        });
      },
      filterAll: true
    },
    {
      Header: "Method",
      className:"method",
      accessor: "method",
      width: 100,
      filterable: true,
      filterMethod: (filter, row) => row[filter.id] === filter.value,
      Filter: ({filter, onChange}) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{width: "100%"}}
          value={filter ? filter.value : ""}
        >
          <option value="">ALL</option>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="OPTIONS">OPTIONS</option>
        </select>
      )
    },
    {
      id: "checkbox",
      accessor: "",
      Cell: ({original}) => {
        return (
          <input
            type="checkbox"
            className="checkbox"
            checked={props.checkedReqs[original.requestId]}
            onChange={e => {
              props.handleCheckToggle(original.requestId, e.target.checked);
            }}
          />
        );
      },
      Header: "Intercept",
      sortable: false,
      width: 75,
      className: 'text-center'
    }
  ];

  const enabledRequests = props.requests.filter(request => {
      return props.checkedReqs[request.requestId];
    })

  return (
    <div>
    <Switch isOn={false}  />
    <div className="response-action text-right">
      <InterceptAllButton
      disabled={!enabledRequests.length}
      handleCheckedRequests={() => {
        return props.handleCheckedRequests(enabledRequests);
      }}
      />
      <button
        type="button"
        className="btn btn-sm btn-primary btn-clear"
        onClick={props.clearRequests}
      >
        CLEAR
      </button>
      <button
        type="button"
        className="btn btn-sm btn-primary"
        onClick={ () => props.disableInterceptor(props.tabId) }
      >
        DISABLE
      </button>
    </div>

    <ReactTable
      data={props.requests}
      columns={columns}
      showPagination={true}
      showPaginationTop={false}
      showPaginationBottom={true}
      defaultPageSize={10}
      page={props.PageDetails[props.tabId] ? props.PageDetails[props.tabId].currentPageNumber : 0}
      pageSize={props.PageDetails[props.tabId] ? props.PageDetails[props.tabId].currentRowSize : 10}
      onPageChange={changedPageNo => props.handlePaginationChange(changedPageNo, props.tabId, "currentPageNumber")}
      onPageSizeChange={changedRowSize => props.handlePaginationChange(changedRowSize, props.tabId, "currentRowSize")}
      collapseOnDataChange={false}
      SubComponent={row => (
        <InterceptForm
          rowProps={row}
          handleStatusCodeChange={props.handleStatusCodeChange}
          handleRespTextChange={props.handleRespTextChange}
          responseText={props.responseText}
          statusCodes={props.statusCodes}
          handleContentTypeChange={props.handleContentTypeChange}
          contentType={props.contentType}
        />
      )}
    />
    </div>
  );
};
export default RequestList;
