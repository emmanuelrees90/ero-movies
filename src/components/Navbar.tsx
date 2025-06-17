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
        e.preventDefault();
    };

    async function fetchGenres() {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        if (!API_KEY) {
            throw new Error('Missing TMDB API key');
        }

        const res = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
        );
        if (!res.ok) {
            throw new Error('Failed to fetch genres');
        }

        const data = await res.json();
        setGenres(data.genres);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^[a-zA-Z0-9]*$/.test(value)) {
            setSearch(value);
        }
    };

    return (
        <nav className="bg-white shadow">
            <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-xl font-bold text-blue-600">Movie Explorer</h1>
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={search}
                        onChange={handleChange}
                        className="px-3 py-2 h-42px border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={genreId ?? ''}
                        onChange={e => setGenreId(e.target.value ? parseInt(e.target.value) : null)}
                        className="px-3 h-42px py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Genres</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-600 h-42px text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Search
                    </button>
                </form>
            </div>
        </nav>
    );
}
