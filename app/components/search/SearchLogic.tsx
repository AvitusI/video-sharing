"use client"

import { useEffect } from "react"

import { searchUser } from "@/app/actions/user.actions"
import { SearchResults } from "./SearchResults"

interface SearchLogicProps {
    queryText: string
    searchResults: any[]
    setSearchResults: (results: any[]) => void
}

export const SearchLogic = ({
    queryText,
    searchResults,
    setSearchResults
}: SearchLogicProps) => {

    useEffect(() => {
        if (!queryText) {
            setSearchResults([])
            return
        }

        (async () => {
            const res = await searchUser(queryText)
            if (res.result) {
                setSearchResults(res.result)
            }
            else if (res.error) {
                console.error(res.error)
            }
        })()
    },[queryText, setSearchResults])

    return (
        <div>
            {queryText && (
                <div className="overflow-y-auto max-h-[70vh] border border-1 rounded-lg">
                    <div className="px-4">
                        <div className="pb-4">
                            <SearchResults
                                searchResults={searchResults} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}