import { useState } from "react";

export default function ProductDetail({ product, onBack, onAddToCart }) {
    const discountPercentage = Math.round(
        ((product.lastPrice - product.price) / product.lastPrice) * 100,
    );

    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(product.images[0]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-slate-800">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Back to products"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
                </button>
                <nav className="text-sm text-slate-500">
                    <ol className="flex gap-2">
                        <li><button onClick={onBack} className="hover:text-black transition-colors">Home</button></li>
                        <li>/</li>
                        <li>Product</li>
                        <li>/</li>
                        <li className="text-slate-900 font-medium truncate max-w-xs">{product.title}</li>
                    </ol>
                </nav>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                <div className="flex flex-col gap-4">
                    <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative group">
                        <img
                            src={activeImage}
                            alt="Product"
                            className="w-full h-full object-contain mix-blend-multiply p-4"
                        />
                        {discountPercentage > 0 && (
                            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                -{discountPercentage}%
                            </span>
                        )}
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(img)}
                                className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden bg-slate-50 ${activeImage === img ? "border-black" : "border-slate-200"
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index}`}
                                    className="w-full h-full object-cover mix-blend-multiply"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold leading-tight mb-2">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} filled={i < Math.floor(product.rating)} />
                                ))}
                            </div>
                            <span className="font-medium">{product.rating}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500 underline decoration-slate-300 underline-offset-4 cursor-pointer hover:text-slate-800 transition-colors">
                                {product.reviews} Reviews
                            </span>
                        </div>
                    </div>

                    <div className="flex items-end gap-3 pb-4 border-b border-slate-100">
                        <span className="text-4xl font-bold">${product.price}</span>
                        <span className="text-xl text-slate-400 line-through mb-1">
                            ${product.lastPrice}
                        </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                        {product.description}
                    </p>
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Select Color
                        </label>
                        <div className="flex gap-3">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color
                                        ? "border-black ring-1 ring-black ring-offset-2"
                                        : "border-transparent hover:scale-110"
                                        }`}
                                    style={{ backgroundColor: color }}
                                    aria-label={`Select color ${color}`}
                                >
                                    {selectedColor === color && color === "#FFFFFF" && (
                                        <CheckIcon className="w-4 h-4 text-black" />
                                    )}
                                    {selectedColor === color && color !== "#FFFFFF" && (
                                        <CheckIcon className="w-4 h-4 text-white" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold">Choose Size</label>
                            <button className="text-xs font-medium text-slate-500 underline hover:text-black">
                                Size Guide
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${selectedSize === size
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-black"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="flex flex-col gap-4 mt-2">
                        <div className="flex gap-4">

                            <div className="flex items-center border border-slate-300 rounded-full px-4 py-2 bg-slate-50">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-black"
                                >
                                    <MinusIcon />
                                </button>
                                <span className="w-8 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-black"
                                >
                                    <PlusIcon />
                                </button>
                            </div>


                            <button onClick={() => onAddToCart(product)} className="flex-1 bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition-transform active:scale-95 flex items-center justify-center gap-2">
                                <CartIcon className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>

                        <button className="w-full border-2 border-slate-200 text-slate-900 px-8 py-3 rounded-full font-semibold hover:border-black transition-colors">
                            Buy Now
                        </button>
                    </div>


                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-full">
                                <TruckIcon />
                            </div>
                            <div>
                                <p className="text-xs font-bold">Free Delivery</p>
                                <p className="text-[10px] text-slate-500">Orders over $200</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-full">
                                <RotateCcwIcon />
                            </div>
                            <div>
                                <p className="text-xs font-bold">Free Returns</p>
                                <p className="text-[10px] text-slate-500">Within 30 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



function StarIcon({ filled }) {
    return (
        <svg
            className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-slate-200"}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
        >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
    );
}

function CheckIcon({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
            />
        </svg>
    );
}

function MinusIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}

function CartIcon({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
        </svg>
    );
}

function TruckIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10 17h4V5H2v12h3" />
            <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
            <path d="M14 17h1" />
            <circle cx="7.5" cy="17.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
    );
}

function RotateCcwIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
        </svg>
    );
}

function ArrowLeftIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
    )
}
