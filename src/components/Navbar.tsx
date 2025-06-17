import { FormEvent, useEffect, useState } from 'react';
import { useSearch } from '@/lib/context/SearchContext';
import { Genre } from '@/lib/types/genreType';


export default function Navbar() {
  const { search, setSearch, genreId, setGenreId } = useSearch();
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault(); // No need to manually trigger fetch
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9\s]*$/.test(value)) {
      setSearch(value);
    }
  };

  async function fetchGenres() {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!API_KEY) throw new Error('Missing TMDB API key');

    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    if (!res.ok) throw new Error('Failed to fetch genres');

    const data = await res.json();
    setGenres(data.genres);
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-y-4 gap-x-4 flex-wrap">
        <h1 className="text-xl font-bold text-blue-600 whitespace-nowrap">
          Movie Explorer
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex flex-wrap items-center gap-x-2 gap-y-3 w-full md:w-auto"
        >
          <input
            type="text"
            aria-label="Search movies"
            placeholder="Search movies..."
            value={search}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            aria-label="Filter by genre"
            value={genreId ?? ''}
            onChange={(e) =>
              setGenreId(e.target.value ? parseInt(e.target.value) : null)
            }
            className="px-3 py-2 border rounded-md w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
