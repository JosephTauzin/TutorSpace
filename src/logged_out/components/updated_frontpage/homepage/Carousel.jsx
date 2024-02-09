import Slide from "./subcomponents/Slide";
import imageLinks from "./HomeCarouselImagesLinks.js";

const Carousel = () => (
	<div className="py-16">
		<h3 className="text-center text-accent mx-auto pb-16 text-2xl md:text-3xl w-9/12 lg:text-5xl lg:leading-tight 2xl:w-7/12 ">
			Check out some TutorSpace generated questions!
		</h3>

		<div className="carousel w-full flex flex-wrap">
			<Slide imageLinks={imageLinks} />
		</div>
	</div>
);

export default Carousel;
