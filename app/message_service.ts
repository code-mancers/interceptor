import { RequestObj } from './request_list';
type GenericCallback = (_: any) => void;

// Outgoing
export function enableLogging(url: string, tabId: number) {
  chrome.runtime.sendMessage({ message: "ENABLE_LOGGING", url, tabId});
}

export function disableLogging(url: string, tabId: number) {
  chrome.runtime.sendMessage({ message: "DISABLE_LOGGING", url, tabId});
}

export function logRequest(tabId: number, request: RequestObj) {
  chrome.tabs.sendMessage(tabId, {message: "LOG_REQUEST", request});
}

export function resetData(tabId: number) {
  chrome.tabs.sendMessage(tabId, {message: "RESET_DATA"});
}

export function getEnabledStatus(tabId:number, callback: GenericCallback) {
  chrome.runtime.sendMessage({message: "GET_ENABLED_STATUS", tabId}, callback);
}

export function getRequests(tabId:number, callback: GenericCallback) {
  chrome.runtime.sendMessage({message: "GET_REQUESTS", tabId }, {}, callback);
}
export function getCount(tabId:number, callback: GenericCallback){
  chrome.runtime.sendMessage({message : "GET_COUNT", tabId}, {}, callback)
}
// TODO: Extract message handlers from background.js and content_script.js
// into this class and use callbacks to register message handlers