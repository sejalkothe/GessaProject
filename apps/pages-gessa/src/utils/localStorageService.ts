const setLocalStorage = (label: string, data: any) => {
    localStorage.setItem(label, JSON.stringify(data));
  };
  
  const getLocalStorage = (label: string): any => {
    return JSON.parse(localStorage.getItem(label) || '{}');
  };
  
  const removeItem = (label: string) => {
    localStorage.removeItem(label);
  };
  
  const clearLocalStorage = () => {
    localStorage.clear();
  };
  
  export { setLocalStorage, getLocalStorage, removeItem, clearLocalStorage };