import { React, useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { Button } from "@progress/kendo-react-buttons";
import { API_URL } from "../constants";

const Search = (props) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [showClear, setShowClear] = useState(false);

  function handleClear() {
    setSearchTerm("");
  }

  useEffect(() => {
    setShowClear(searchTerm.length > 0);
    const throttle = setTimeout(() => {      
      searchConversations();
    }, 500);
    return () => clearTimeout(throttle);
  }, [searchTerm]);

  const searchConversations = async () => {    
    const response = await fetch(API_URL + "/api/conversations?q=" + searchTerm, {
      method: "GET",
      credentials: "include",
    });
    const conversations = await response.json();
    queryClient.setQueryData("conversations", conversations);
  };

  return (
    <div className="form-group search">
      <input type="text" name="q" className="form-control form-control-sm" placeholder="Search..." autoComplete="off" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      {showClear && <Button className="transparent" icon="close" onClick={handleClear}></Button>}
      {!showClear && <Button className="transparent" icon="search"></Button>}
    </div>
  );
};

export default Search;
