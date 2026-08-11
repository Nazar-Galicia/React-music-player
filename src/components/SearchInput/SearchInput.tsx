import {type FC, useEffect, useRef, useState} from "react";
import './SearchInput.css'

interface SearchInputProps {
    setValue: (value: string) => void
}

const SearchInput: FC<SearchInputProps> = (props) => {
    const {
        setValue,
    } = props

    const [inputValue, setInputValue] = useState('')

    let debounceTimer = useRef<number | null>(null);

    useEffect(() => {
        debounceTimer.current = setTimeout(() => {
            setValue(inputValue)
        }, 400)
    }, [inputValue]);

    return (
        <div className="search">
            <svg className="search__icon" viewBox="0 0 24 24" fill="none">
                <path
                    d="M9 18.5V6.5L21 4V16.5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <circle
                    cx="6"
                    cy="18"
                    r="3"
                    stroke="currentColor"
                    stroke-width="2"
                />
                <circle
                    cx="18"
                    cy="16"
                    r="3"
                    stroke="currentColor"
                    stroke-width="2"
                />
            </svg>

            <input
                className="search__input"
                type="search"
                placeholder="Search music..."
                value={inputValue}
                onChange={(event) => {
                    const target = event.target as HTMLInputElement

                    if (debounceTimer.current) clearTimeout(debounceTimer.current)

                    setInputValue(target.value)
                }}
            />

            <kbd onClick={(() => {
                setInputValue('')
            })} className="search__shortcut">X</kbd>
        </div>
    )
}

export default SearchInput