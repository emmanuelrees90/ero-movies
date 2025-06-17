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
                <h1 className="text-2xl font-semibold">Error</h1>
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

            <main className="px-4 py-6 sm:px-6 md:px-10 bg-white min-h-[80vh]">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div className="w-full flex justify-center">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={320}
                            height={480}
                            className="rounded-lg shadow-md object-cover w-full max-w-xs"
                            priority
                        />
                    </div>

                    <div className="md:col-span-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
                            {movie.title}
                        </h1>
                        <p className="text-gray-600 text-sm mb-1">
                            <strong>Released:</strong> {movie.release_date} &nbsp; | &nbsp;
                            <strong>Runtime:</strong> {movie.runtime} mins
                        </p>
                        <p className="text-yellow-500 text-base mb-2">
                            ⭐ {movie.vote_average?.toFixed(1)}
                        </p>

                        <div className="flex flex-wrap gap-2 my-4">
                            {movie?.genres?.length > 0 ? (
                                movie.genres.map(g => (
                                    <span
                                        key={g.id}
                                        className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium"
                                    >
                                        {g.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-gray-400">No genres available</span>
                            )}
                        </div>

                        <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                            {movie.overview}
                        </p>

                        <button
                            onClick={() => router.back()}
                            className="mt-6 inline-block text-sm text-blue-600 underline hover:text-blue-800"
                        >
                            ← Back
                        </button>
                    </div>
                </div>
            </main>
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
