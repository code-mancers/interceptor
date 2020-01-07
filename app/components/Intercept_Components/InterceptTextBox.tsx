import * as React from "react";
import ContentEditable from "react-simple-contenteditable";

import { RequestHeaderList } from "./RequestHeaderList";
interface InterceptTextBox {
  requestRecords: any;
  rowProps: any;
  fetchResponse: any;
  handleRespTextChange: any;
  handleStatusCodeChange: any;
  handleContentTypeChange: any;
  currentTabId: number;
  fetchFailure: any;
}

export const InterceptTextBox: React.SFC<InterceptTextBox> = props => {
  const requestId = props.rowProps.checkbox.requestId;
  const defaultResponseText = "";
  const defaultStatusCode = "200";
  const defaultContentType = "application/json";
  const responseTextValue = props.requestRecords.responseText || defaultResponseText;
  const statusCodeValue = props.requestRecords.statusCode || defaultStatusCode;
  const contentTypeValue = props.requestRecords.contentType || defaultContentType;
  return (
    <div className="form-container">
      <div>
        {props.requestRecords.serverError ? (
          <p className="popup-error-message popup-error"> {props.requestRecords.serverError} </p>
        ) : null}
      </div>
      <div className="grid-container form">
        <div className="full-url">
          <label htmlFor="">URL</label>
          <ContentEditable
            tagName="div"
            className="urlText"
            html={props.rowProps.checkbox.url}
            contentEditable="plaintext-only"
            onChange={(e, value) => {
              props.handleChangeUrl(value, props.currentTabId, props.index);
            }}
          />
        </div>
        <div className="response">
          <label className="responseTextlabel">Mocked Response Text </label>
          <button
            title="Fetch Response Text"
            className="fetch-responsetext btn-sm btn-primary"
            disabled={props.requestRecords.fetching}
            onClick={() => {
              //empty the earlier set error before requesting for data again
              props.fetchFailure("", requestId, props.currentTabId);
              props.fetchResponse(props.rowProps.checkbox, props.currentTabId);
            }}
          >
            Fetch{props.requestRecords.fetching ? 'ing':''} Response 
          </button>
          <textarea
            name="responseText"
            className="responseText"
            defaultValue={responseTextValue}
            key={props.requestRecords.serverResponse}
            title="Mock Response"
            //value={textAreaValue}
            onChange={event => {
              props.handleRespTextChange(event.target.value, requestId, props.currentTabId);
            }}
          />
        </div>
        <div className="content">
          <label htmlFor="">Content Type</label>
          <select
            value={contentTypeValue}
            className="content-type-select"
            onChange={event => {
              props.handleContentTypeChange(event.target.value, requestId, props.currentTabId);
            }}
          >
            <option value="application/json">application/json</option>
            <option value="text/html">text/html</option>
            <option value="text/csv">text/csv</option>
            <option value="text/javascript">text/javascript</option>
            <option value="application/javascript">application/javascript</option>
            <option value="text/css">text/css</option>
            <option value="text/plain">text/plain</option>
            <option value="application/pdf">application/pdf</option>
          </select>
          <label className="mt15" htmlFor="">
            Select Status
          </label>
          <select
            value={statusCodeValue}
            className="select-status"
            onChange={event => {
              props.handleStatusCodeChange(event.target.value, requestId, props.currentTabId);
            }}
          >
            <option value="100">100 - Continue</option>
            <option value="101">101 - Switching Protocols</option>
            <option value="200">200 - OK</option>
            <option value="201">201 - Created</option>
            <option value="202">202 - Accepted</option>
            <option value="203">203 - Non-Authoritative Information</option>
            <option value="204">204 - No Content</option>
            <option value="205">205 - Reset Content</option>
            <option value="206">206 - Partial Content</option>
            <option value="207">207 - Multi-Status</option>
            <option value="300">300 - Multiple Choice</option>
            <option value="301">301 - Moved Permenantly</option>
            <option value="302">302 - Found</option>
            <option value="303">303 - See Other</option>
            <option value="304">304 - Not Modified</option>
            <option value="305">305 - Use Proxy</option>
            <option value="307">307 - Temporary Redirect</option>
            <option value="400">400 - Bad Request</option>
            <option value="401">401 - Unauthorized</option>
            <option value="402">402 - Payment Required</option>
            <option value="403">403 - Forbidden</option>
            <option value="404">404 - Not Found</option>
            <option value="405">405 - Method Not Allowed</option>
            <option value="406">406 - Not Acceptable</option>
            <option value="407">407 - Proxy Authentication Required</option>
            <option value="408">408 - Request Timeout</option>
            <option value="409">409 - Conflict</option>
            <option value="410">410 - Gone</option>
            <option value="411">411 - Length Required</option>
            <option value="412">412 - Precondition Failed</option>
            <option value="413">413 - Request Entity Too Large</option>
            <option value="414">414 - Request-URI Too Long</option>
            <option value="415">415 - Unsupported Media Type</option>
            <option value="416">416 - Requested Range Not Satisfiable</option>
            <option value="417">417 - Expectation Failed</option>
            <option value="422">422 - Unprocessable Entity</option>
            <option value="500">500 - Internal Server Error</option>
            <option value="501">501 - Not Implemented</option>
            <option value="502">502 - Bad Gateway</option>
            <option value="503">503 - Service Unavailable</option>
            <option value="504">504 - Gateway Timeout</option>
            <option value="505">505 - HTTP Version Not Supported</option>
          </select>
        </div>
        <RequestHeaderList requestHeaders={props.rowProps.checkbox.requestHeaders} />
      </div>
    </div>
  );
};
InterceptTextBox.defaultProps = {};
