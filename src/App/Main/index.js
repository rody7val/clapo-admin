import React from 'react'
import logo from '../../img/logo.svg'
import { Route } from 'react-router-dom'
import { Container, Row, Col, Card, Button, CardHeader, CardFooter, CardBlock,
  CardTitle, CardText } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.css'
import '../../css/Main.css'

import Menu from '../Menu'

class Main extends React.Component {

	render() {
		const { user, collapsed, collapsedMenu, resize } = this.props

		const Mi = () => (
			<div>
				<Card>
					<CardHeader tag='h3'>Mi perfil</CardHeader>
					<CardBlock>
						<Container>
							<Row>
								<Col md={4}>
									<CardTitle>
										<img width='150px' className='img-responsive' src={user.photoURL}/>
									</CardTitle>
								</Col>
								<Col md={8}>
									<CardText><b>{user.displayName}</b></CardText>
									<CardText>{user.email}</CardText>
									{ user.phoneNumber ? (
										<CardText>{user.phoneNumber}</CardText>
									) : ''}
									<Button disabled>Editar</Button>
								</Col>
							</Row>
						</Container>
					</CardBlock>
					<CardFooter className="text-muted">Proveedeor: {user.providerData[0].providerId}</CardFooter>
				</Card>
			</div>
		)

		return (
			<div class>
				<div id='content-main' className={user && collapsed ? 'in' : ''}>
					<Container fluid id='main'>
						<Route exact={true} path='/' render={() => (
							<Row>
								<Col md={6}>
									<img id='banner' src={logo} alt='logo.svg' className='img-responsive'/>
								</Col>
								<Col xs={12} sm={12} md={6}>
									<h5>ADMINISTRACIÓN WEB</h5>
									<h1>C.L.A.Po</h1>
									<p>Bienvenido {user ? user.displayName : ''}! Esto es una aplicación web creada con el fin de administrar contenido empresarial. Aquí es posible controlar información en una base de datos como nuevos usuarios o noticias, asi como tambien subir y compartir ficheros multimedia como fotos o videos a un sistema de archivos en la nube.</p>
								</Col>
							</Row>
						)}/>
						{ user ? (
							<div>
								<Route path='/site/:anchor' component={WebSite}/>
								<Route path='/usuarios' component={Users}/>
								<Route path='/noticias' component={Blog}/>
								<Route path='/mi' component={Mi} user={user}/>
							</div>
						) : ''}
					</Container>
				</div>
				<Menu resize={resize} user={user} collapsed={collapsed} collapsedMenu={collapsedMenu} />
			</div>
		);
	}
}

const WebSite = ({ match }) => (
	<div>
		Se mostrará formulario para modificar el contenido de <b>{match.params.anchor}</b> en el sitio web.
	</div>
)

const Users = ({ match }) => (
	<div>
		Se mostrará un listado de los <b>{match.path}</b> registrados.
	</div>
)

const Blog = ({ match }) => (
	<div>
		Se redireccionará al sitio de <b>{match.path}</b> empresarial.
	</div>
)


export default Main;