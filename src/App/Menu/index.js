import React from 'react'
import logo from '../../img/logo.svg'
import title from '../../img/brand-title-menu.svg'
import { Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.css'
import '../../css/Menu.css'

class Menu extends React.Component {

	render() {
		const { user, collapsed, collapsedMenu } = this.props

		return (
			<div>
			{ user ? (
				<div>
					<div id='wrap-menu' className={collapsed ? 'in' : ''} onClick={collapsedMenu}></div>
					<div id='content-menu' className={collapsed ? 'in' : ''}>
						<div id='menu'>
							<div id='brand-menu'>
								<Link to='/'>
									<img className='title' src={title} alt='title.svg' onClick={collapsedMenu} />
								</Link>
							</div>
							<Nav vertical id='menu-list'>
								<hr/>
								<p className='lead'><small>SITIO WEB</small></p>
								<NavItem>
									<Link to={'/site/banners'} onClick={collapsedMenu}>Banners</Link>
								</NavItem>
								<NavItem>
									<Link to={'/site/cloacas'} onClick={collapsedMenu}>Cloacas</Link>
								</NavItem>
								<NavItem>
									<Link to={'/site/internet'} onClick={collapsedMenu}>Internet</Link>
								</NavItem>
								<NavItem>
									<Link to={'/site/canal-2'} onClick={collapsedMenu}>Canal 2</Link>
								</NavItem>
								<NavItem>
									<Link to={'/site/agua'} onClick={collapsedMenu}>Agua</Link>
								</NavItem>
								<hr/>
								<p className='lead'><small>INTERNO</small></p>
								<NavItem>
									<Link to={'/usuarios'} onClick={collapsedMenu}>Usuarios</Link>
								</NavItem>
								<NavItem>
									<Link to={'/noticias'} onClick={collapsedMenu}>Noticias</Link>
								</NavItem>
							</Nav>
							<div className='menu-footer'>
								<img width='60px' src={logo} alt='logo.svg'/>
								<p className='lead'>Clapo - 2017</p>
							</div>
						</div>
					</div>
				</div>
			) : ''}
			</div>
		);
	}
}

export default Menu;			