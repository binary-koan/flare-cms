export type ListState =
  | { loadingState: "loading"; data?: any[]; error?: undefined }
  | { loadingState: "error"; data?: undefined; error: string }
  | { loadingState: "loaded"; data: any[]; error?: undefined }

export type ListAction =
  | { namespace: "list"; type: "loadData" }
  | { namespace: "list"; type: "dataLoaded"; data: any[] }
  | { namespace: "list"; type: "loadError"; error: string }
