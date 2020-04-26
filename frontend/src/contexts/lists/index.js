import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BASE_URL } from "../../config/env";

export const listContext = React.createContext({
  data: null,
  loading: true,
  setData: null,
});

const ListProvider = ({ children }) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const getLists = async () => {
      let lists = null;
      try {
        const response = await Axios.get(`${BASE_URL}/compras`);
        lists = response.data;
      } catch (e) {
        console.error(e);
      }
      setState({
        loading: false,
        data: lists,
      });
    };
    getLists();
  }, []);

  return (
    <listContext.Provider
      value={{
        ...state,
        setData: (newData) => {
          setState({ ...state, data: newData });
        },
      }}
    >
      {children}
    </listContext.Provider>
  );
};

export default ListProvider;
