import { SearchIcon } from "lucide-react"

interface SearchInputProps {
    value: string
    onChange: (e: any) => void
}

export const SearchInput = ({
    value,
    onChange
}: SearchInputProps) => {
    return (
        <div id="search" className="mb-2 w-full">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="text-gray-500"/>
                </div>
                <input
                    placeholder="Search user to message"
                    value={value}
                    onChange={onChange}
                    className="focus:ring-green-500 focus:border-green-500 focus:outline-none block w-full pl-10 sm:text-sm border-gray-500 rounded-full p-2 border placeholder:text-xsgray-500"
                />
            </div>
        </div>
    )
}