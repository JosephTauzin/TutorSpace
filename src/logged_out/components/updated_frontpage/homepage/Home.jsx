import Header from "./Header";
import Nav from "../Nav";
import Footer from "../Footer";
import FeatureHeadline from "./FeatureHeadline";
import CallToAction from "./CallToAction";
import Contact from "./Contact";
import Pricing from "../Pricing";
import Carousel from "./Carousel";

const Home = () => (
	<>
		<Nav />
		<Header />
		<FeatureHeadline />
		<CallToAction />
		<Pricing />
		<Carousel />
		<Contact />
		<Footer />
	</>
);

export default Home;
