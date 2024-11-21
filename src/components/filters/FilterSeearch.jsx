function FilterSearch({ value, onChange, placeholder }) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 mx-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-red-500 shadow-lg transition-all duration-300 ease-in-out"
        />
    );
}

export default FilterSearch;
