import PricingCard from "./PricingCard"
import EnterprisePricingCard from "./EnterprisePricingCard"
const Pricing = () => (
        <div className="section5Content mx-auto w-8/12 py-16 lg:w-11/12 2xl:w-8/12">
            <div className="pricingBoxes grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-4 lg:gap-4">
                <PricingCard title={"Starter"} description={"Up to 15 student seats"} price={"5"} shadowColor={"shadow-[#7494FB]"}/>
                <PricingCard title={"Business"} description={"Up to 50 student seats"} price={"3"} shadowColor={"shadow-[#2E4756]"}/>
                <EnterprisePricingCard title={"Enterprise"} description={"Need more seats? Let's talk!"} shadowColor={"shadow-[#E26D5C]"}/>
            </div>

            <div className ="freeTrialCaption block text-center pt-20 pb-8 lg:pb-16 text-[#2E4756]">
                <p className="text-2xl lg:text-3xl">Try <span className="font-bold">TutorSpace</span> for free for 1 month, no strings attached!</p>
            </div>
        </div>
)

export default Pricing