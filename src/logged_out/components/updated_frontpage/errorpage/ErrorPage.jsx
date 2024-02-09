import { useRouteError } from "react-router-dom"
import Nav from "../Nav"
import Footer from "../Footer"

const ErrorPage = () => {
    const error = useRouteError()
    console.error(error)

    return (
        <>
            <Nav />
            <div className="text-center h-screen flex flex-col justify-center">
                <h1 className="text-4xl font-bold lg:text-6xl">Sorry, this page does not exist.</h1>
                <p className="py-10 lg:text-3xl">Use the navigation links or this button to get back on.</p>
                <button className="btn btn-primary mx-auto text-secondary">Return Home</button>
            </div>
            <Footer />
        </>
    )
}

export default ErrorPage