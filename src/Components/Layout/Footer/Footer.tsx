import Total from "../../Todo/Total/Total";
import "./Footer.css";

function Footer(): JSX.Element {
    const year = new Date().getFullYear();
    return (
        <div className="Footer">
            <p>All Rights reserved to Loren Bar from John Bryce &copy; {year}</p>
            <Total/>
        </div>
    );
}

export default Footer;
