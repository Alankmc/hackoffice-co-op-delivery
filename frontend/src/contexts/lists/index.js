import React, { useEffect, useState } from "react";
import Axios from "axios";

export const listContext = React.createContext({
  data: null,
  loading: true,
});

const ListProvider = ({children}) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
  });
  
  useEffect(() => {
    const getLists = async () => {
      let lists = null;
      try {
        lists = await Axios.get('/lists');
      } catch (e) {
        console.error(e);
      }
      setState({
        loading: false,
        data: lists,
      })
    }
    getLists();
  }, []);

  return (
    <listContext.Provider value={state}>
      {children}
    </listContext.Provider>
  )
}

export default ListProvider;