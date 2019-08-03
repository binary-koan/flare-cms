export type FormState =
  | {
      loadingState: "loading"
      originalData?: undefined
      currentData?: undefined
      error?: undefined
    }
  | { loadingState: "error"; originalData?: undefined; currentData?: undefined; error: string }
  | { loadingState: "loaded"; originalData: any; currentData: any; error?: undefined }

export type FormAction =
  | { namespace: "form"; type: "loadData" }
  | { namespace: "form"; type: "dataLoaded"; data: any }
  | { namespace: "form"; type: "loadError"; error: string }
  | { namespace: "form"; type: "edit"; path: string; value: any }
