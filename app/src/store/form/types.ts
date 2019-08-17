export type FormState =
  | {
      loadingState: "loading"
      loadedData?: undefined
      fieldValues?: undefined
      error?: undefined
      savingState?: undefined
    }
  | {
      loadingState: "error"
      loadedData?: undefined
      fieldValues?: undefined
      error: string
      savingState?: undefined
    }
  | {
      loadingState: "loaded"
      loadedData: any
      fieldValues: any
      error?: undefined
      savingState?: undefined | "saving"
    }

export type FormAction =
  | { namespace: "form"; type: "loadData" }
  | { namespace: "form"; type: "dataLoaded"; data: any }
  | { namespace: "form"; type: "loadError"; error: string }
  | { namespace: "form"; type: "edit"; path: string | string[]; value: any }
  | { namespace: "form"; type: "saveDraft" }
  | { namespace: "form"; type: "draftSaved"; data: any }
