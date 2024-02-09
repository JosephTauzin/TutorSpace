/* eslint-disable react/prop-types */
const PricingCard = ({title, description, price, shadowColor}) => (
    
        <div className={`starterPricing priceBox bg-slate-50 px-10 pt-10 pb-20 rounded text-[#2E4756] shadow-[inset_0_2px_0_rgba(0,0,0,1)] ${shadowColor}`}>
            <h4 className="font-semibold text-2xl text-center lg:text-left xl:text-4xl">{title}</h4>
            <p className="mt-5 text-center text-lg lg:text-left xl:text-xl 2xl:text-2xl">{description}</p>
            <div className="listedCost starterCost mt-8 px-2 grid grid-cols-2">
                <span className="bigDollar font-medium text-5xl xl:text-6xl text-right pr-5 align-text-top">${price}</span>
                <div className="smallCost">
                    <p className="align-top"><span className="perStudent font-normal text-xl xl:text-3xl">per student</span></p>
                    <p className="mt-2 align-top text-[#a7b4bb]"><span className="costCaption text-md xl:text-lg">billed monthly</span></p>
                </div>
            </div>
        </div>
)

export default PricingCard