import React from 'react';

type GalleryItem = {
	img: string;
	title: string;
};

type GalleryPageProps = {
	items: GalleryItem[];
};

const Masonry: React.FC<GalleryPageProps> = ({ items }) => {
	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<h1 className="text-3xl font-bold text-center mb-8">Image Gallery</h1>
			<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
				{items.map((item: GalleryItem, index: number) => (
					<div
						key={index}
						className="break-inside-avoid overflow-hidden rounded-lg shadow-md group relative"
					>
						<img
							src={item.img}
							alt={item.title}
							className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
						/>
						<div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-sm font-medium">
							{item.title}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Masonry;
