import Link from 'next/link';

const Navbar = () => {

  return (
        <nav className="row align-items-center">
            <div className="logo col-md-6">
                <h1>Telemetry</h1>
            </div>
            <ul className="col-md-6 nav align-items-center justify-content-end">
                <li className="nav-item"><Link href="/"><a className="nav-link">HOME</a></Link></li>
                <li className="nav-item"><Link href="/about"><a className="nav-link">ABOUT</a></Link></li>
                <li className="nav-item"><Link href="/dashboard"><a className="nav-link">DASHBOARD</a></Link></li>
                <li className="nav-item"><Link href="/login/"><a className="nav-link">LOGIN</a></Link></li>
            </ul>
        </nav>
    );
}
 
export default Navbar;