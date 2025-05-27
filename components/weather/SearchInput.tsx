"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import styles from "./SearchInput.module.css"

interface SearchInputProps {
  onSearch: (city: string) => void
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setQuery("")
    }
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </div>
    </form>
  )
}
