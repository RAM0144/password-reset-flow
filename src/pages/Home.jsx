import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Home page</h1>
            <nav>
                <ul>
                    <li><Link to="/students">Students</Link></li>
                </ul>
            </nav>
        </div>
    )
};

export default Home;