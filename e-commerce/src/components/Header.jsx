import logo from "../assets/image.png";

export default function Header({ onCartClick, cartCount = 0 }) {
    return (
        <header className="border-b bg-white">
            <div className="flex gap-4 justify-between items-center w-full max-w-7xl mx-auto px-4 py-3">

                <Logo />


                <div className="flex-1 max-w-xl mx-4">
                    <Search />
                </div>


                <HeaderActions onCartClick={onCartClick} cartCount={cartCount} />
            </div>
        </header>
    );
}

function Logo() {
    return (
        <a href="/" className="flex-shrink-0">
            <img className="h-10 w-auto object-contain" src={logo} alt="Logo" />
        </a>
    );
}

function Search() {
    return (
        <div className="relative w-full">
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-4 pr-12 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
                <button
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-300 hover:bg-orange-500 text-slate-600 p-1.5 rounded-full transition-colors"
                    aria-label="Search"
                >
                    <SearchIcon />
                </button>
            </div>
        </div>
    );
}

function HeaderActions({ onCartClick, cartCount }) {
    return (
        <div className="flex items-center gap-4">

            <button className="bg-black hover:bg-slate-800 text-white rounded-full px-5 py-2 text-sm font-medium transition-colors">
                Sign Up
            </button>


            <button
                onClick={onCartClick}
                className="relative group p-2 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="View Cart"
            >
                <CartIcon />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {cartCount}
                    </span>
                )}
            </button>
        </div>
    );
}

function SearchIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
        </svg>
    );
}

function CartIcon() {
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
            className="w-6 h-6 text-slate-700 group-hover:text-black"
        >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
    );
}
