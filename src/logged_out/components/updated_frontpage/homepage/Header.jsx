const Header = () => (
	<div className="hero min-h-screen bg-base-100 px-1.5">
		<div className="hero-content max-w-full text-center flex-col min-h-screen w-full lg:flex-row-reverse lg:text-left overflow-x-hidden">
			
			<img
				src={require('./assets/tutorspacesplineimage.png')}
				className="hidden max-w-full overflow-hidden lg:-mr-48 lg:my-0 lg:block"
			/>
			<div className="lg:pl-12 xl:pl-16">
				<h1 className="text-4xl font-bold lg:text-6xl" id="main">
					Technology for Tutoring Today
				</h1>
				<p className="py-10 lg:text-3xl">
					Prepare students for tomorrow with all the tools you need to run your
					tutoring business, all in one place.
				</p>
				<a href="#contact">
					<button className="btn btn-primary text-secondary">
						Try 1 Month Free!
					</button>
				</a>
			</div>
		</div>
	</div>
);

export default Header;


/*

<img
				src={require('./assets/learning.jpg')}
				className="w-full max-w-sm rounded-lg shadow-2xl my-10 lg:hidden "
			/>
			
*/