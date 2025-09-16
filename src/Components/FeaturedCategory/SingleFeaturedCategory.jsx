import React from 'react';
import { Link } from 'react-router-dom';

const SingleFeaturedCategory = ({ category }) => {
    return (
        <div className="flex flex-col items-center justify-center w-24 h-24 text-center transition-transform duration-300 shadow-2xl md:w-32 md:h-32 bg-base-100 md:p-4 rounded-2xl hover:scale-105 hover:shadow-xl hover:bg-base-200">
            <Link className="flex flex-col items-center" to={category.path}>
                <div className="transition-transform duration-300 w-14 h-14 md:w-20 md:h-20 group-hover:scale-110">
                    <img
                        src={category.icon}
                        alt={category.name}
                        className="object-contain w-full h-full"
                    />
                </div>
                <p className="mt-2 text-sm font-medium">{category.name}</p>
            </Link>
        </div>
    );
};

export default SingleFeaturedCategory;
