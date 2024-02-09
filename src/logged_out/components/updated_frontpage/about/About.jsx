import Nav from "../Nav";
import Footer from "../Footer";
import Pricing from "../Pricing";

const About = () => (
	<>
		<Nav />
		<h1 className="text-3xl font-bold lg:text-5xl text-center pt-16">
			Frequently Asked Questions
		</h1>
		<div className="mx-auto py-16 bg-base-100 w-11/12 lg:w-8/12">
			<div className="join join-vertical w-full">
				<div className="collapse collapse-plus join-item  ">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title text-lg font-medium">
						What is TutorSpace?
					</div>
					<div className="collapse-content">
						<p>
							TutorSpace is a cutting-edge platform transforming the way
							tutoring businesses operate. At its core, TutorSpace leverages
							advanced AI technology for SAT/ACT question generation along with
							offering a comprehensive suite of tools for educational and
							administrative efficiency. Say goodbye to traditional methods;
							TutorSpace is your gateway to an AI-enhanced educational
							experience!
						</p>
					</div>
				</div>
				<div className="collapse collapse-plus join-item  ">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title text-lg font-medium">
						Who Benefits From TutorSpace?
					</div>
					<div className="collapse-content">
						<p>
							TutorSpace is tailored for tutoring businesses eager to embrace AI
							technology for an enhanced educational approach. It&apos;s an
							ideal choice for those who wish to focus more on educational
							outcomes and less on administrative tasks, providing a seamless,
							tech-driven experience for administrators, tutors, and students
							alike.
						</p>
					</div>
				</div>
				<div className="collapse collapse-plus join-item  ">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title text-lg font-medium">
						What are some features of TutorSpace?
					</div>
					<div className="collapse-content">
						<p className="py-2">
							AI-Driven SAT/ACT Preparation: Our standout feature, an AI
							question generating software, provides bespoke practice questions
							for SAT and ACT, including interactive learning modules and
							quizzes.
						</p>
						<p className="py-2">
							Advanced Progress Tracking: Utilize analytics for in-depth student
							performance insights. Interactive Educational Tools: Features like
							an interactive whiteboard and file sharing enhance the learning
							experience.
						</p>
						<p className="py-2">
							Integrated Learning Modules: Complete with tests, quizzes, and an
							automated grading system. Efficient Scheduling and Communication:
							Simplify the organization of sessions and maintain effective
							communication channels.
						</p>
						<p className="py-2">
							Efficient Scheduling and Communication: Simplify the organization
							of sessions and maintain effective communication channels.
						</p>
						<p className="py-2">
							Multi-User Access: Custom portals for students, parents, and
							tutors.
						</p>
						<p className="py-2">
							Streamlined Administrative Tools: Essential tools for payment
							processing and business management are a part of the package to
							reduce time spent away from teaching.
						</p>
					</div>
				</div>
				<div className="collapse collapse-plus join-item  ">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title text-lg font-medium">
						How Does TutorSpace Stand Out with AI?
					</div>
					<div className="collapse-content">
						<p>
							The heart of TutorSpace is its AI-powered SAT/ACT question
							generating software, making it a standout in the educational tech
							space. This feature not only offers customized test preparation,
							but also provides dynamic learning modules, making studying more
							interactive and efficient.
						</p>
					</div>
				</div>
			</div>
		</div>
		<Pricing />
		<Footer />
	</>
);

export default About;
