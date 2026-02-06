export default function ProductCard({ product, onSelectProduct }) {
  const {
    images,
    price,
    description,
    rating = 0,
    amountRated = 0,
    lastPrice,
  } = product;
  const image = images[0];

  const discountPercentage =
    lastPrice && lastPrice > price
      ? Math.round((lastPrice - price / lastPrice) * 100)
      : 0;

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="w-full max-w-sm bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300 overflow-hidden relative group"
    >
      {discountPercentage > 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          -{discountPercentage}%
        </span>
      )}

      <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white text-gray-500 hover:text-red-500 transition-colors z-10 opacity-0 group-hover:opacity-100">
        <HeartIcon className="w-5 h-5" />
      </button>

      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={image}
          alt={description}
        />

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center bg-gradient-to-t from-black/60 to-transparent pt-8">
          <button className="bg-white text-slate-900 hover:bg-orange-500 hover:text-white font-medium py-2 px-6 rounded-full shadow-lg transition-colors flex items-center gap-2 transform active:scale-95 text-sm">
            <CartIcon className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center space-x-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled={i < rating} className="w-4 h-4" />
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded ml-2">
            {rating}.0
          </span>
          <span className="text-xs text-slate-500">({amountRated})</span>
        </div>

        <h5
          className="text-sm font-semibold tracking-tight text-slate-900 line-clamp-2 h-10 leading-snug"
          title={description}
        >
          {description}
        </h5>

        <div className="flex items-baseline justify-between mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">${price}</span>
            {lastPrice && (
              <span className="text-sm text-slate-500 line-through">
                ${lastPrice}
              </span>
            )}
          </div>
          <button className="md:hidden p-2 text-slate-900 bg-slate-100 rounded-full hover:bg-slate-200">
            <CartIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StarIcon({ filled, className }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 22 20"
      stroke={!filled ? "currentColor" : "none"}
      strokeWidth={!filled ? "1.5" : "0"}
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function CartIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
