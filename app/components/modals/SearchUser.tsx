"use client";

import { useState } from "react";

import { SearchInput } from "../search/SearchInput"
import { SearchLogic } from "../search/SearchLogic";


export const SearchDialog = () => {
  const [queryText, setQueryText] = useState<string>("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleChange = (e: any) => setQueryText(e.target.value)

  return (
    <div className="relative z-50">
      <SearchInput
        value={queryText}
        onChange={handleChange}
      />
      <SearchLogic
        queryText={queryText}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
    </div>
  )
}

  