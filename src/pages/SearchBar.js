import React, { useState } from "react";
import { Input, Radio } from "antd";

const { Search } = Input;

function SearchBar(props) {
    const [error, setError] = useState("");

    const handleSearch = (value) => {
        if (value === "") {
            setError("Please input your search keyword!");
            return;
        }
        setError("");
        props.handleSearch({keyword: value });
    };

    return (
        <div className="search-bar">
            <Search
                placeholder="Destinaltion/Restaurant"
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
            />
            <p className="error-msg">{error}</p>

            {/*<Radio.Group*/}
            {/*    onChange={changeSearchType}*/}
            {/*    value={searchType}*/}
            {/*    className="search-type-group"*/}
            {/*>*/}
            {/*    <Radio value={SEARCH_KEY.all}>All</Radio>*/}
            {/*    <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>*/}
            {/*    <Radio value={SEARCH_KEY.user}>User</Radio>*/}
            {/*</Radio.Group>*/}
        </div>
    );
}

export default SearchBar;