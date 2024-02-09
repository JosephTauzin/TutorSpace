const CallToAction = () => (
	<div className="hero min-h-fit m-auto py-16 bg-base-100 w-9/12 lg:w-11/12 2xl:w-8/12">
		<div className="hero-content text-center flex-col lg:flex-row-reverse lg:text-left lg:space-y-1">
			<img
				src={require('./assets/learning.jpg')}
				className="w-full max-w-sm rounded-lg shadow-2xl my-10 lg:my-0 "
			/>
			<div className="lg:mr-10">
				<h3 className="text-3xl lg:text-4xl">
					Take charge of your business with tools to empower your operations
				</h3>
				<p className="py-10 lg:text-2xl">
					Take the spreadsheets and checklists out of your day to day.{" "}
					<span className="font-bold">TutorSpace</span> makes it easy to run
					your business so you can focus on what matters: teaching.
				</p>
				<a href="#contact">
					<button className="btn btn-primary text-secondary">Learn More</button>
				</a>
			</div>
		</div>
	</div>
);

export default CallToAction;
