import { createContext, useContext, useState, ReactNode } from 'react'

interface SearchContextType {
  search: string
  setSearch: (val: string) => void
  genreId: number | null
  setGenreId: (id: number | null) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('')
  const [genreId, setGenreId] = useState<number | null>(null)
  

  return (
    <SearchContext.Provider value={{ search, setSearch, genreId, setGenreId }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useSearch must be used within a SearchProvider')
  return context
}