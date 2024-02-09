/* eslint-disable react/prop-types */
const EnterprisePricingCard = ({title, description, shadowColor}) => (
    <div className={`enterprisePricing priceBox bg-slate-50 px-10 pt-10 pb-20 rounded text-[#2E4756] shadow-[inset_0_2px_0_rgba(0,0,0,1)] ${shadowColor}`}>
        <h4 className="font-semibold text-2xl text-center lg:text-left xl:text-4xl">{title}</h4>
        <p className="mt-5 text-center text-lg lg:text-left xl:text-xl 2xl:text-2xl">{description}</p>
        <div className="listedCost starterCost mt-8 lg:mt-14 px-2">
        <a href="#contact"><button className="btn btn-primary text-secondary w-full">Contact Us</button></a>
        </div>
    </div>
)

export default EnterprisePricingCard