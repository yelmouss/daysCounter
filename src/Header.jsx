import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Font from 'react-font'

function Header() {
    return (
        <Font family='Dancing Script'>
            <Navbar expand="lg" sticky='top' className={`bg-dark text-light bg-opacity-75`}>
                <Container>
                    <Navbar.Brand href="#home" className='text-light fs-1 fw-bolder '>Racha Bennis</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="me-auto">

                    </Nav>

                    <Nav >
                        By yelmouss
                    </Nav>
                </Container>
            </Navbar>
        </Font>
    )
}

export default Header