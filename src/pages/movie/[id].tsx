import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { MovieDetailsPageProps, Movie } from '@/lib/types/movieType';
import Image from 'next/image';

export default function MovieDetailsPage({ movie, error }: MovieDetailsPageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div className="p-6 text-center text-gray-500">Loading...</div>;
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-600">
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="p-6 text-center text-gray-600">
                <p>Movie not found.</p>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{movie.title} | Movie Explorer</title>
            </Head>
            <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6">
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={320}
                    height={480}
                    className="w-full md:w-64 rounded-lg shadow object-cover"
                    priority
                />
                <div>
                    <h1 className="text-3xl font-bold text-blue-600">{movie.title}</h1>
                    <p className="text-gray-500 mt-1">
                        Released: {movie.release_date} | Runtime: {movie.runtime} mins
                    </p>
                    <p className="text-yellow-500 mt-1">⭐ {movie.vote_average?.toFixed(1)}</p>

                    <div className="mt-2 flex gap-2 flex-wrap">
                        {movie?.genres?.length > 0 ? (
                            movie.genres.map(g => (
                                <span
                                    key={g.id}
                                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                                >
                                    {g.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-gray-400">No genres available</span>
                        )}
                    </div>

                    <p className="mt-4 text-gray-800">{movie.overview}</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-6 text-sm text-blue-600 underline"
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
        );
        const data = await res.json();

        const paths = data.results.map((movie: Movie) => ({
            params: { id: movie.id.toString() },
        }));

        return {
            paths,
            fallback: true,
        };
    } catch (error) {
        console.error('Error generating static paths:', error);
        return {
            paths: [],
            fallback: true,
        };
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.id as string;
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
        );

        if (!res.ok) {
            return { props: { movie: null, error: 'Failed to fetch movie details' } };
        }

        const movie = await res.json();

        // Only validate essential fields
        if (!movie || typeof movie.id !== 'number' || !movie.title) {
            return { props: { movie: null, error: 'Invalid movie structure returned from API' } };
        }

        return { props: { movie } };
    } catch (err) {
        return {
            props: {
                movie: null,
                error: (err as Error).message || 'Unknown error occurred',
            },
        };
    }
};
