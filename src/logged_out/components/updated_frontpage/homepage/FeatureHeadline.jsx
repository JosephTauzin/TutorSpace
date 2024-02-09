import FeatureCard from "./subcomponents/FeatureCard";
import { FEATURECONSTANTS } from "./subcomponents/featureHeadlineConstants";
const FeatureHeadline = () => (
	<div className="py-16">
		<h2 className="text-center mx-auto pb-16 lg:pb-32 text-2xl md:text-3xl w-8/12 lg:text-5xl lg:leading-tight 2xl:w-6/12 ">
			Everything you need to make your tutoring business a success, all in one
			place
		</h2>
		<div className="w-8/12 grid grid-cols-1 mx-auto gap-3 md:gap-4 lg:grid-cols-3 lg:w-11/12 lg:gap-6 2xl:w-8/12 [&>*:nth-child(odd)]:bg-primary [&>*:nth-child(even)]:bg-accent">
			{FEATURECONSTANTS.map((feature) => (
				<FeatureCard
					key={feature.imageUrl}
					caption={feature.caption}
					cardTitle={feature.cardTitle}
				/>
			))}
		</div>
	</div>
);
export default FeatureHeadline;
