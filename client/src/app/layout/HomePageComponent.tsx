import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function HomePageComponent() {
    return (
        <Fragment>
            <h1>Home page</h1>
            <Link to="/activities"> <h2> Go to activities dashboard. </h2></Link>
        </Fragment>
    )
}