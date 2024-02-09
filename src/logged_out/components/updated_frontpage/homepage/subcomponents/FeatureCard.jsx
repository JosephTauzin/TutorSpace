/* eslint-disable react/prop-types */
const FeatureCard = ({ caption, cardTitle }) => (
	<div className="card w-full shadow-xl text-secondary">
		<div className="card-body">
			<h4 className="card-title xl:text-2xl">{cardTitle}</h4>
			<p className="xl:text-lg">{caption}</p>
		</div>
	</div>
);

export default FeatureCard;
