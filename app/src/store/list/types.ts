export type ListState =
  | { loadingState: "loading"; data?: any[]; filters?: ListFilter[]; error?: undefined }
  | { loadingState: "error"; data?: undefined; filters?: ListFilter[]; error: string }
  | { loadingState: "loaded"; data: any[]; filters?: ListFilter[]; error?: undefined }

export type ListAction =
  | { namespace: "list"; type: "loadData" }
  | {
      namespace: "list"
      type: "setFilters"
      filters: ListFilter[]
    }
  | { namespace: "list"; type: "dataLoaded"; data: any[] }
  | { namespace: "list"; type: "loadError"; error: string }

export type ListFilter = {
  name: string
  attributes: string[]
  operator: string
  value: any
  displayValue: any
}
