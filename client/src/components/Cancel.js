import { Link } from 'react-router-dom';

/*export default function Cancel() {
    return (
        <section>
            <p>Your payment did not go through, please try again</p>
            <Link to='/'>
                <button type='link'>Go back</button>
            </Link>
        </section>
        
    )
}*/

const Cancel = () => {
    return (
        <div className="cancel">
            <h2>Your payment did not go through, please try again</h2>
            <Link to='/'>
                <button type='link'>Go back</button>
            </Link>
        </div>);
}


export default Cancel;