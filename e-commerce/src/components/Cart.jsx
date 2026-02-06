import { useState } from "react";


export default function Cart({ cartItems, onBack, onRemove, onUpdateQuantity }) {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = subtotal * 0.2;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-slate-800">
            <h1 className="text-3xl font-bold mb-8">Your Cart ({cartItems.length} items)</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2 flex flex-col gap-6">
                    {cartItems.length === 0 ? (
                        <p className="text-slate-500">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 p-4 border border-slate-200 rounded-xl bg-white"
                            >

                                <div className="w-24 h-24 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center text-slate-400 overflow-hidden">
                                    <img
                                        src={item.images && item.images[0]}
                                        alt={item.title || item.description}
                                        className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                </div>


                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-lg line-clamp-1">
                                                {item.title || item.description}
                                            </h3>
                                            <button
                                                onClick={() => onRemove(item.id)}
                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Size: <span className="text-slate-700 font-medium">{item.selectedSize || "M"}</span> | Color:{" "}
                                            <span
                                                className="inline-block w-3 h-3 rounded-full border border-slate-300 ml-1 align-middle"
                                                style={{ backgroundColor: item.selectedColor || "#000" }}
                                            ></span>
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center border border-slate-300 rounded-full px-3 py-1 bg-slate-50">
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-black"
                                            >
                                                <MinusIcon />
                                            </button>
                                            <span className="w-8 text-center font-medium text-sm">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-black"
                                            >
                                                <PlusIcon />
                                            </button>
                                        </div>
                                        <div className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-600 font-medium mt-4 hover:underline hover:text-black w-fit"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Continue Shopping
                    </button>
                </div>


                {cartItems.length > 0 && (
                    <div className="lg:col-span-1">
                        <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 sticky top-4">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="flex flex-col gap-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Subtotal</span>
                                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Discount (-20%)</span>
                                    <span className="font-bold text-red-500">-${discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Delivery Fee</span>
                                    <span className="font-bold">${deliveryFee}</span>
                                </div>
                                <div className="border-t border-slate-200 my-2"></div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3">

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Add promo code"
                                        className="flex-1 border border-slate-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-black"
                                    />
                                    <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800">
                                        Apply
                                    </button>
                                </div>

                                <button className="w-full bg-black text-white py-3.5 rounded-full font-bold text-lg hover:bg-slate-800 transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2">
                                    Go to Checkout
                                    <ArrowRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


function TrashIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    )
}
function MinusIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
    )
}
function PlusIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
    )
}
function ArrowLeftIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
    )
}
function ArrowRightIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
    )
}
