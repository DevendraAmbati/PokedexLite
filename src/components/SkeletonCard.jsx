const SkeletonCard = () => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-4 pt-24 md:pt-20">
            {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
                    <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto"></div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonCard;