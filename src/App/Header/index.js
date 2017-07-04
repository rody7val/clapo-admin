import React from 'react';
import logo from '../../img/logo.svg';
import title from '../../img/brand-title.svg';
import { Container, Collapse, Nav, NavItem, NavLink, Navbar, NavbarToggler, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Header.css';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false,
			collapsed: false,
			modal: false
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.renderMenu = this.renderMenu.bind(this);
		this.renderLoginButton = this.renderLoginButton.bind(this);
	}

	toggleDropdown() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	toggleModal() {
		this.setState({
			modal: !this.state.modal
		});
	}

	// Login/Logout
	renderLoginButton () {
		// Si esta logeado
		if (this.props.user) {
			return (
				<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
				  <DropdownToggle caret className='session'>
				    <img src={this.props.user.photoURL} alt={this.props.user.displayName}/>
				  </DropdownToggle>
				  <DropdownMenu right>
				    <DropdownItem header>Hola {this.props.user.displayName}</DropdownItem>
				    <DropdownItem>Mi perfil</DropdownItem>
				    <DropdownItem>Ayuda</DropdownItem>
				    <DropdownItem divider/>
				    <DropdownItem>Configuración</DropdownItem>
				    <DropdownItem onClick={this.props.logout}>Salir</DropdownItem>
				  </DropdownMenu>
				</Dropdown>
			);
		} else {
			// Si no
			let styleButton = {
				display: 'block',
				margin: '0 auto 4px auto'
			}
			return (
				<div>
					<Button color="primary" onClick={this.toggleModal}>Entrar</Button>
					<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
						<ModalHeader toggle={this.toggleModal}>Iniciar sesión con:</ModalHeader>
						<ModalBody>
							<Button style={styleButton} color='primary' disabled>Facebook</Button>
							<Button style={styleButton} color='danger' onClick={this.props.loginGoogle}>Google</Button>
							<Button style={styleButton} color='info' disabled>Twitter</Button>
							<p>También puedes registrarte con usuario y contraseña:</p>
							<Button style={styleButton} color='secondary' disabled>Registrarme</Button>
							<p>Ya estas registrado?</p>
							<Button style={styleButton} color='secondary' disabled>Inicia sesión</Button>
						</ModalBody>
						<ModalFooter>
							<Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
						</ModalFooter>
					</Modal>
				</div>
			);
		}
	}

	renderMenu() {
		if (this.props.user) {
			return (
			<div id='content-menu' className={this.state.collapsed ? 'in' : ''}>
				<div id='menu'>
					<Nav vertical>
						<hr/>
						<p className='lead'><small>SITIO WEB</small></p>
						<NavItem>
							<NavLink href="/">Cloacas</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/">Internet</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/">Canal 2</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/">Agua</NavLink>
						</NavItem>
						<hr/>
						<p className='lead'><small>INTERNO</small></p>
						<NavItem>
							<NavLink href="/">Usuarios</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/">Noticias</NavLink>
						</NavItem>
					</Nav>
					<div className='menu-footer'>
						<img width='60px' src={logo} alt='logo.svg'/>
						<p className='lead'>Clapo - 2017</p>
					</div>
				</div>
			</div>
			)
		}
	}

	renderToggleButton () {
		if (this.props.user) {
			return (
				<button
					type='button'
					onClick={this.toggleNavbar}
					className='navbar-toggler navbar-toggler-left'
					data-toggle="toggle"
					data-target="#content-menu">
					<span className='navbar-toggler-icon'></span>
				</button>
			);
		}
	}

	render() {

		return (
		<div>
			<Navbar color="inverse" fixed='top' inverse className='App-header'>
				<Container className='full'>
					<div className='left brand'>
						{ this.renderToggleButton() }
						<a href='/'>
							<h4 className='title'>
								<img src={title} alt='title.svg' />
							</h4>
						</a>
					</div>
					<div className='right'>
						{ this.renderLoginButton() }
					</div>
				</Container>
			</Navbar>

			{ this.renderMenu() }
		</div>
		);
	}
}

export default Header;