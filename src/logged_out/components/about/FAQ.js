import React from 'react'

const FAQ = () => { 
    return (
        <div className="content-wrapper">
            <div className='faq' data-aos="fade-down">
                <h2>About Us</h2>
                <div className='faqGroup'>
                    <p>The college admissions process grows increasingly cutthroat every year, and we ensure that all of our students have the tools they need to succeed. While many top colleges and universities are making SAT and ACT scores optional , they can still be a valuable asset to many students’ applications.</p>
                </div>
                <div className='faqGroup'>
                    <p>Our tutors graduated from top-tier schools across the country and are all amongst the top 1% of SAT test scorers. Having been through the college admissions process relatively recently, they understand what skills today’s students need to succeed in SAT testing rooms to college classrooms and beyond. Going from high school to college-level classes is a struggle for many students, and we want to make that transition as smooth as possible.</p>
                </div>
                <div className='faqGroup'>
                    <p>At Measure Up!, we want to get our students off of tutoring services altogether. We want them to be prepared once they enter their dream school so they can handle challenging classes stress-free.</p>
                </div>
                <div className='faqGroup'>
                    <p>To achieve this, we use TutorSpace, our proprietary tutoring system that tracks our students’ progress, identifies areas for improvement, and provides greater results than traditional tutoring services.</p>
                </div>
                <div className='faqGroup'>
                    <p>Students can see increases of up to 200 points on the SAT using this system. We work with each student individually to create bespoke plans for greatest improvement, and we accept all students, regardless of base score.</p>
                </div>
                <div className='faqGroup'>
                    <p>Our one-on-one tutoring sessions are all completely online with flexible hours and no rescheduling fees!</p>
                </div>
            </div>
            <p></p>
            <div className="faq" data-aos="fade-down">
                <h2 >FAQ</h2>
                <ul>
                    <div className="faqGroup">
                        <li><p style={{fontWeight:'bold'}}>How many sessions do students go through?</p></li>
                        <li><p>MeasureUp! students usually go through 4-6 sessions prior to the exam to reach their goal score. However, each student is unique, which is why we do not offer preset session bundles. Instead, our goal is get students off of tutoring services altogether and give them the tools they need to succeed.</p></li>
                    </div>

                    <div className="class faqGroup">
                        <li><p style={{fontWeight:'bold'}}>Many schools and universities are test-optional, so why should I consider taking the SAT or ACT?</p></li>
                        <li><p>High standardized test scores can be a valuable asset to a well-rounded college application. A score above the 75th percentile of a college’s admissions class can help cut through the noise quickly and push an application to the top of the stack.</p></li>
                    </div>

                    <div className="class faqGroup">
                        <li><p style={{fontWeight:'bold'}}>Should I take the SAT or ACT?</p></li>
                        <li><p>Can’t figure out which one to prep for? Click here!</p></li>
                    </div>

                    <div className="class faqGroup">
                        <li><p style={{fontWeight:'bold'}}>What is the Success Network?</p></li>
                        <li><p>Our tutors are students and alumni of some of the top schools in the country, with many having gone on to work at some prestigious companies across the fields of finance, software, engineering, and more. We want to provide students with not just tutoring, but mentors and advisors on their journey to college and beyond.</p></li>
                    </div>

                    <div className="class faqGroup">
                        <li><p style={{fontWeight:'bold'}}>What is TutorSpace?</p></li>
                        <li><p>TutorSpace is our proprietary tutoring software. It is a virtual classroom, progress tracker, gradebook and calendar that streamlines the tutoring process and maximizes our students’ progress.</p>
                        <p>For all business inquiries about TutorSpace, please email <a href="mailto:joseph@measureupprep.com">joseph@measureupprep.com</a></p></li>
                    </div>

                    <div className="class faqGroup">
                        <li><p style={{fontWeight:'bold'}}>How do I register for MeasureUp on TutorSpace?</p></li>
                        <li><p> You should receive login credentials in your email within one business day after signing up for sessions. If you have not yet received an email, please email <a href="mailto:joseph@measureupprep.com">joseph@measureupprep.com</a></p></li>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default FAQ