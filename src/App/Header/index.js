import React from 'react'
import logo from '../../img/logo.svg'
import title from '../../img/brand-title.svg'
import { Link } from 'react-router-dom'
import { Container, Collapse, Nav, NavItem, NavLink, Navbar, NavbarToggler, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.css'
import '../../css/Header.css'

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dropdownOpen: false,
			modal: false,
		}

		this.toggleModal = this.toggleModal.bind(this)
		this.toggleDropdown = this.toggleDropdown.bind(this)
	}

	toggleDropdown() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		})
	}

	toggleModal() {
		this.setState({
			modal: !this.state.modal,
		})
	}

	render() {
		const { user, collapsedMenu } = this.props
		let styleButton = {
			display: 'block',
			margin: '0 auto 4px auto'
		}

		return (
		<div>
			<Navbar color="inverse" fixed='top' inverse className='App-header'>
				<Container className='full'>
					<div className='left brand'>

						{ user ? (
							<button
								type='button'
								onClick={collapsedMenu}
								className='collapse-brand navbar-toggler navbar-toggler-left'
								data-toggle="toggle"
								data-target="#content-menu">
								<span className='navbar-toggler-icon'></span>
							</button>
						) : '' }

						<a href='/' className='title-link'>
							<h4 className='title'>
								<img src={title} alt='title.svg' />
							</h4>
						</a>
					</div>
					<div className='right'>

						{ user ? (
							<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
								<DropdownToggle caret className='session'>
									<img src={this.props.user.photoURL} alt={this.props.user.displayName}/>
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem header>Hola {this.props.user.displayName}</DropdownItem>
									<DropdownItem className='link-dropdown'>
										<Link to={'/mi'}>Mi perfil</Link>
									</DropdownItem>
									<DropdownItem disabled>Ayuda</DropdownItem>
									<DropdownItem divider/>
									<DropdownItem disabled>Configuración</DropdownItem>
									<DropdownItem onClick={this.props.logout}>Salir</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						) : (
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
						)}

					</div>
				</Container>
			</Navbar>

		</div>
		);
	}
}

export default Header;