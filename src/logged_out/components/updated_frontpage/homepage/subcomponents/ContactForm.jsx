const ContactForm = () => (
        <form id="contact" className="grid grid-cols-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 gap-4">
                <div className="inline-block" id="firstNameBlock">
                    <label htmlFor="firstName" className="requiredField">First Name</label>
                    <input type="text" name="firstName" className="w-full bg-base-200 p-1 text-[#2E4756]  mt-1 rounded focus:outline-none" required />
                </div>

                <div className="inline-block" id="lastNameBlock">
                    <label htmlFor="lastName" className="requiredField">Last Name</label>
                    <input type="text" name="lastName" className="w-full bg-base-200 p-1 text-[#2E4756]  mt-1 rounded focus:outline-none" required />
                </div>

                <div className="inline-block lg:col-span-2" id="emailBlock">
                    <label htmlFor="email" className="requiredField">Email</label>
                    <input type="email" name="email" className="w-full bg-base-200 p-1 text-[#2E4756]  mt-1 rounded focus:outline-none" required />
                </div>

                <div className="inline-block lg:col-span-2" id="companyNameBlock">
                    <label htmlFor="companyName" className="requiredField">Company Name</label>
                    <input type="text" name="companyName" className="w-full bg-base-200 p-1 text-[#2E4756]  mt-1 rounded focus:outline-none" required />
                </div>

                <div className="inline-block lg:col-span-2" id="companyWebsiteBlock">
                    <label htmlFor="companyWebsite">Company Website <span className="optional opacity-60">(Optional)</span></label>
                    <input type="text" name="companyWebsite" className="w-full bg-base-200 p-1 text-[#2E4756]  mt-1 rounded focus:outline-none" />
                </div>
            </div>

            <div className="inline-block my-4" id="messageBlock">
                <label htmlFor="message">What can we do for you? <span className="optional opacity-60">(Optional)</span></label>
                <textarea name="message" id="message" rows="6" className="w-full bg-base-200 p-1 text-[#2E4756] mt-1 rounded focus:outline-none"></textarea>
            </div>
            
            <button className="btn btn-accent">Submit</button>
        </form>
)

export default ContactForm