import React, {useCallback, useEffect, useState} from 'react';
import Context from "./Context";
import axios from "axios";
import {calculateSendHours, calculateWeekDays, retrieveRelevantData} from "../../utils/arrays";

function Provider(props) {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);

    const getData =  useCallback(async (param) => {
         await Promise.resolve(axios.get(`http://localhost:5000/${param}`))
             .then((r) =>
                 {
                     setData(Object.values(retrieveRelevantData(r.data)));
                 }
             );
    },[]);
    const chartCalculus = useCallback((func) => {
       return selected.length > 0 ? func(selected) :
                data.length > 0 ? func(data) :
                    []
    },[selected,data]);

    return (
        <Context.Provider
            value = {
                {
                    getData: getData,
                    setData: setData,
                    data: data,
                    setSelected: setSelected,
                    selected: selected,
                    weekDaysData: chartCalculus(calculateWeekDays),
                    hoursData: chartCalculus(calculateSendHours),

                }
            }
        >
            {props.children}
        </Context.Provider>
    );
}

export default Provider;
