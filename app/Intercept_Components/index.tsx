import * as React from 'react'
import { InterceptTextBox } from './InterceptTextBox';

export const InterceptForm = (props) => {
  return(
    <div>
    <InterceptTextBox rowProps={props.rowProps.row} handleRespTextChange={props.handleRespTextChange} responseText={props.responseText} handleStatusCodeChange={props.handleStatusCodeChange} statusCodes={props.statusCodes}
    handleContentTypeChange={props.handleContentTypeChange} contentType={props.contentType} />
    </div>
  )
}