import { React, useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@progress/kendo-react-buttons";

import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { MultiSelect } from "@progress/kendo-react-dropdowns";

import { API_URL } from "../constants";
// import Conversation from "./Conversation";

const textField = "name";
const keyField = "id";
const defaultItem = {
  [textField]: "Select customer...",
  [keyField]: null,
};
const emptyItem = {
  [textField]: "loading ...",
};
const pageSize = 5;
const loadingData = [];

while (loadingData.length < pageSize) {
  loadingData.push({ ...emptyItem });
}

const init = {
  method: "GET",
  accept: "application/json",
  credentials: "include",
};

const NewMessage = () => {
  const dataCaching = useRef([]);
  const pendingRequest = useRef();
  const requestStarted = useRef(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const skipRef = useRef(0);

  const resetCach = () => {
    dataCaching.current.length = 0;
  };

  const requestData = useCallback((skip, filter) => {
    if (requestStarted.current) {
      clearTimeout(pendingRequest.current);
      pendingRequest.current = setTimeout(() => {
        requestData(skip, filter);
      }, 50);
      return;
    }

    const url =
      API_URL +
      `/api/users?q=${filter}&skip=${skip}&top=${pageSize}&count=true`;
    requestStarted.current = true;

    fetch(url, init)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        const total = json["count"];
        const items = [];

        if (total > 0) {
          json.data.forEach((element, index) => {
            const item = {
              id: element.id,
              name: element.profile.name ?? element.username,
            };
            items.push(item);
            dataCaching.current[index + skip] = item;
          });
        }
        if (skip === skipRef.current) {
          setData(items);
          setTotal(total);
        }
        requestStarted.current = false;
      });
  }, []);
  useEffect(() => {
    requestData(0, filter);
    return () => {
      resetCach();
    };
  }, [filter, requestData]);
  const onFilterChange = useCallback(
    (event) => {
      const filter = event.filter.value;
      resetCach();
      requestData(0, filter);
      setData(loadingData);
      skipRef.current = 0;
      setFilter(filter);
    },
    [requestData]
  );
  const shouldRequestData = useCallback((skip) => {
    console.log(skip, pageSize);
    for (let i = 0; i < pageSize; i++) {
      if (!dataCaching.current[skip + i]) {
        return true;
      }
    }

    return false;
  }, []);
  const getCachedData = useCallback((skip) => {
    const data = [];

    for (let i = 0; i < pageSize; i++) {
      data.push(dataCaching.current[i + skip] || { ...emptyItem });
    }

    return data;
  }, []);
  const pageChange = useCallback(
    (event) => {
      const newSkip = event.page.skip;

      console.log(newSkip);

      if (shouldRequestData(newSkip)) {
        requestData(newSkip, filter);
      }

      const data = getCachedData(newSkip);
      setData(data);
      skipRef.current = newSkip;
    },
    [filter, getCachedData, requestData, shouldRequestData]
  );
  const onChange = useCallback((event) => {
    const value = event.target.value;

    if (value && value[textField] === emptyItem[textField]) {
      return;
    }

    setValue(value);
  }, []);
  return (
    <MultiSelect
      data={data}
      value={value}
      onChange={onChange}
      dataItemKey={keyField}
      textField={textField}
      filterable={true}
      onFilterChange={onFilterChange}
      virtual={{
        pageSize: pageSize,
        skip: skipRef.current,
        total: total,
      }}
      onPageChange={pageChange}
      style={{
        width: "200px",
      }}
    />
  );
};

export default NewMessage;

//   const [visible, setVisible] = useState(false);

//   const toggleDialog = () => {
//     setVisible(!visible);
//   };

//   const state = {
//       data: {}
//   }

//   const searchMembers = async (event) => {
//     const response = await fetch(API_URL + "/api/users?text=" + event.filter, {
//       method: "GET",
//       credentials: "include",
//     });

//     this.setState({
//         data: await response.json()
//     });

//   };

//   return (
//     <div>
//       <button className="k-button" onClick={toggleDialog}>
//         New message...
//       </button>
//       {visible && (
//         <Dialog title="New message" onClose={toggleDialog}>
//           <p
//             style={{
//               margin: "25px",
//               textAlign: "center",
//             }}
//           >
//             <MultiSelect
//               data={this.state.data}
//               filterable={true}
//               onFilterChange={searchMembers}
//             />
//           </p>
//           <DialogActionsBar>
//             <button className="k-button" onClick={toggleDialog}>
//               Cancel
//             </button>
//             <button className="k-button" onClick={toggleDialog} disabled>
//               Create
//             </button>
//           </DialogActionsBar>
//         </Dialog>
//       )}
//     </div>
//   );
