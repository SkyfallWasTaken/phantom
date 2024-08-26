interface Window {
  __pyodideLoaded: boolean | null | undefined;
  loadPyodide: () => Promise<any>;
  pyodide: any;
}
