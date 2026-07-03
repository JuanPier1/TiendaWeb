import { useState } from 'react';

function Carousel({ items, renderItem }) {
    const [index, setIndex] = useState(0);

    const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

    return (
        <div className="relative w-full max-w-md mx-auto">
        <div className="overflow-hidden rounded-xl">
            <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
            >
            {items.map((item, i) => (
                <div key={i} className="w-full flex-shrink-0">
                {renderItem(item)}
                </div>
            ))}
            </div>
        </div>

        <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md"
        >
            ‹
        </button>
        <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md"
        >
            ›
        </button>

        <div className="flex justify-center gap-2 mt-3">
            {items.map((_, i) => (
            <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
            />
            ))}
        </div>
        </div>
    );
}

export default Carousel;