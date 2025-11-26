import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const ToyDetails = () => {
  const { id } = useParams();
  const [toys, setToys] = useState([]);
  const [toy, setToy] = useState(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    setLoading(true);
    fetch("/toys.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load toy data");
        return res.json();
      })
      .then((data) => setToys(data || []))
      .catch((err) => {
        console.error(err);
        setToys([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!toys || toys.length === 0) {
      setToy(null);
      return;
    }
    const found = toys.find((t) => String(t.toyId) === String(id));
    setToy(found || null);
  }, [id, toys]);

  // simple star renderer
  const Stars = ({ rating = 0 }) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <div className="flex items-center space-x-1" aria-hidden>
        {Array.from({ length: full }).map((_, i) => (
          <svg
            key={"f" + i}
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.63a1 1 0 00.95.69h3.814c.969 0 1.371 1.24.588 1.81l-3.088 2.244a1 1 0 00-.364 1.118l1.18 3.63c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.711 2.82c-.785.57-1.84-.197-1.54-1.118l1.18-3.63a1 1 0 00-.364-1.118L2.656 9.057c-.783-.57-.38-1.81.588-1.81h3.814a1 1 0 00.95-.69l1.18-3.63z" />
          </svg>
        ))}
        {half && (
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <defs>
              <linearGradient id="halfgrad">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              fill="url(#halfgrad)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.63a1 1 0 00.95.69h3.814c.969 0 1.371 1.24.588 1.81l-3.088 2.244a1 1 0 00-.364 1.118l1.18 3.63c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.711 2.82c-.785.57-1.84-.197-1.54-1.118l1.18-3.63a1 1 0 00-.364-1.118L2.656 9.057c-.783-.57-.38-1.81.588-1.81h3.814a1 1 0 00.95-.69l1.18-3.63z"
            />
          </svg>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <svg
            key={"e" + i}
            className="w-5 h-5 opacity-30"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.63a1 1 0 00.95.69h3.814c.969 0 1.371 1.24.588 1.81l-3.088 2.244a1 1 0 00-.364 1.118l1.18 3.63c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.711 2.82c-.785.57-1.84-.197-1.54-1.118l1.18-3.63a1 1 0 00-.364-1.118L2.656 9.057c-.783-.57-.38-1.81.588-1.81h3.814a1 1 0 00.95-.69l1.18-3.63z" />
          </svg>
        ))}
      </div>
    );
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100">
        <div className="text-center">
          <div className="animate-pulse text-2xl font-bold text-purple-700">
            Loading toy...
          </div>
          <div className="mt-3 text-sm text-gray-600">
            Tiny elves are fetching the toy details 🎈
          </div>
        </div>
      </div>
    );
  }

  if (!toy) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100">
        <div className="max-w-xl w-full bg-white/80 backdrop-blur rounded-2xl p-8 shadow-2xl text-center">
          <h2 className="text-2xl font-extrabold text-purple-700">
            Toy not found 😅
          </h2>
          <p className="mt-3 text-gray-700">
            We couldn't find a toy with id{" "}
            <span className="font-mono">{id}</span>.
          </p>
        </div>
      </div>
    );
  }

  const handleTryForm = (e) =>{
    e.preventDefault();
    toast('Form Submitted successfully');
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Toy Image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={
              toy.pictureURL ||
              "https://via.placeholder.com/800x600?text=Toy+Image"
            }
            alt={toy.toyName}
            className="w-full h-96 object-cover"
            onError={(e) =>
              (e.currentTarget.src =
                "https://via.placeholder.com/800x600?text=Toy+Image")
            }
          />
        </div>

        {/* Toy Info Card */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-2xl">
          <h1 className="text-3xl font-extrabold text-purple-700">
            {toy.toyName}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            by{" "}
            <span className="font-semibold text-gray-800">
              {toy.sellerName}
            </span>{" "}
            • <span className="text-xs text-gray-500">{toy.sellerEmail}</span>
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Stars rating={toy.rating} />
              <span className="text-sm text-gray-700 font-medium">
                {toy.rating ?? "No rating"}
              </span>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-pink-600">
                ${toy.price?.toFixed ? toy.price.toFixed(2) : toy.price}
              </div>
              <div className="text-xs text-gray-500">
                Qty:{" "}
                <span className="font-medium text-gray-700">
                  {toy.availableQuantity ?? 0}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {toy.description}
          </p>

          <div className="mt-4 flex gap-2">
            <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-sm font-semibold text-indigo-600 shadow-sm">
              {toy.subCategory || "Toy"}
            </span>
            <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-sm font-semibold text-pink-600 shadow-sm">
              Age {toy.ageGroup || "All"}
            </span>
          </div>
        </div>

        {/* Try Now Form */}

        <div className="bg-white/95 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-purple-700">Try this toy ✨</h2>
          <p className="mt-2 text-sm text-gray-600">
            Leave your name and email — we’ll reach out with details.
          </p>

          <form onSubmit={handleTryForm} className="mt-4 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Full name
              </span>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-200 p-3 shadow-sm focus:ring-2 focus:ring-purple-300"
                placeholder="Your name"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                type="email"
                className="mt-1 block w-full rounded-lg border border-gray-200 p-3 shadow-sm focus:ring-2 focus:ring-pink-300"
                placeholder="you@example.com"
                required
              />
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg hover:scale-[1.01] transform transition"
            >
              Try Now
            </button>
          </form>
        </div>

        <div className="text-center text-sm text-gray-600">
          ✨ Kid-safe toys only. Colors may differ from the picture. 🎈
        </div>
      </div>
    </div>
  );
};

export default ToyDetails;
