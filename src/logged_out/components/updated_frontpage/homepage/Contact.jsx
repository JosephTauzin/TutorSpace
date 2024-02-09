import ContactForm from "./subcomponents/ContactForm";

const Contact = () => (
	<div className="section6Content hero-content mx-auto w-8/12 py-16 grid grid-cols-1 lg:w-11/12 lg:grid-cols-2 2xl:w-8/12">
		<div className="contactCTAText text-center lg:mr-32 lg:text-left self-start">
			<h3
				className="text-2xl md:text-3xltext-2xl md:text-3xl lg:text-4xl font-medium"
				id="contact"
			>
				See What TutorSpace Can Do For You
			</h3>
			<p className="my-10 lg:text-2xl">
				Ready to see how TutorSpace can help you run your business? Tell us a
				bit about yourself and we’ll reach out to set up a demo of the platform
				and answer any questions about the product!
			</p>
		</div>
		<ContactForm />
	</div>
);

export default Contact;
