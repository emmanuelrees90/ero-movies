/**
 * @file SearchContext.test.tsx
 * @description Unit test for SearchContext
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react'
import { SearchProvider, useSearch } from '../SearchContext'

function TestComponent() {
  const { search, setSearch, genreId, setGenreId } = useSearch()

  return (
    <div>
      <p data-testid="search">{search}</p>
      <p data-testid="genre">{genreId ?? 'null'}</p>
      <button onClick={() => setSearch('batman')}>Set Search</button>
      <button onClick={() => setGenreId(28)}>Set Genre</button>
    </div>
  )
}

describe('SearchContext', () => {
  it('updates search and genreId', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    )

    expect(screen.getByTestId('search').textContent).toBe('')
    expect(screen.getByTestId('genre').textContent).toBe('null')

    act(() => {
      screen.getByText('Set Search').click()
      screen.getByText('Set Genre').click()
    })

    expect(screen.getByTestId('search').textContent).toBe('batman')
    expect(screen.getByTestId('genre').textContent).toBe('28')
  })
})
