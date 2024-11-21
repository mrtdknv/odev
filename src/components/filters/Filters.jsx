function Filters({ value, onChange, options, placeholder }) {
    return (
        <div className="relative w-full mx-5">
            <select
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-red-500 shadow-lg transition-all duration-300 ease-in-out"
            >
                <option value="">{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Filters;
