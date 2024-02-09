import { useState } from "react";

const Slide = ({ imageLinks }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const handlePrev = () => {
		setActiveIndex((prevIndex) =>
			prevIndex > 0 ? prevIndex - 1 : imageLinks.length - 1
		);
	};

	const handleNext = () => {
		setActiveIndex((prevIndex) =>
			prevIndex < imageLinks.length - 1 ? prevIndex + 1 : 0
		);
	};

	return (
		<div className="carousel-item relative w-full lg:w-9/12 mx-auto">
			<img
				src={imageLinks[activeIndex]}
				className="w-11/12 lg:w-10/12 xl:w-8/12 mx-auto"
			/>
			<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<button
					onClick={handlePrev}
					className="btn btn-circle h-6 w-6 lg:h-12 lg:w-12"
				>
					❮
				</button>
				<button
					onClick={handleNext}
					className="btn btn-circle h-6 w-6 lg:h-12 lg:w-12"
				>
					❯
				</button>
			</div>
		</div>
	);
};

export default Slide;
