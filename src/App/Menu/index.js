import React from 'react'
import logo from '../../img/logo.svg'
import title from '../../img/brand-title-menu.svg'
import menuMovil from '../../img/brand-menu.svg'
import { Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.css'
import '../../css/Menu.css'

class Menu extends React.Component {

	render() {
		const { user, collapsed, collapsedMenu, resize } = this.props

		return (
			<div>
			{ user ? (
				<div>
					<div id='wrap-menu' className={collapsed ? 'in' : ''} onClick={collapsedMenu}></div>
					<div id='content-menu' className={collapsed ? 'in' : ''}>
						<div id='menu'>
							<div id='brand-menu'>
								<button
									type='button'
									onClick={collapsedMenu}
									className='collapse-brand-movil navbar-toggler navbar-toggler-left'
									data-toggle="toggle"
									data-target="#content-menu">
									<span className='navbar-toggler-icon'>
										<img src={menuMovil} alt='icon-menu'/>
									</span>
								</button>
								<a href='/' className='title-link'>
									<img className='title' src={title} alt='title.svg' onClick={collapsedMenu} />
								</a>
							</div>
							<Nav vertical id='menu-list'>
								<hr/>
								<p className='lead'><small>SITIO WEB</small></p>
								<NavItem>
									<Link to={'/site/banners'} onClick={resize <= 542 ? collapsedMenu : null}>Banners</Link>
								</NavItem>
								<NavItem>
									<Link to={'/site/cloacas'} onClick={resize <= 542 ? collapsedMenu : null}>Cloacas</Link>
								</NavItem>
								<NavItem>
									<Link to={'/site/internet'} onClick={resize <= 542 ? collapsedMenu : null}>Internet</Link>
								</NavItem>
								<NavItem>
									<Link to={'/site/canal-2'} onClick={resize <= 542 ? collapsedMenu : null}>Canal 2</Link>
								</NavItem>
								<NavItem>
									<Link to={'/site/agua'} onClick={resize <= 542 ? collapsedMenu : null}>Agua</Link>
								</NavItem>
								<hr/>
								<p className='lead'><small>INTERNO</small></p>
								<NavItem>
									<Link to={'/usuarios'} onClick={resize <= 542 ? collapsedMenu : null}>Usuarios</Link>
								</NavItem>
								<NavItem>
									<Link to={'/noticias'} onClick={resize <= 542 ? collapsedMenu : null}>Noticias</Link>
								</NavItem>
							</Nav>
							<div className='menu-footer'>
								<img width='60px' src={logo} alt='logo.svg'/>
								<p><small>© 2017 <a className='link-menu-footer' href='https://github.com/rody7val/clapo-admin' target='_blank' rel='noopener noreferrer'>clapo-admin@0.1</a></small></p>
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