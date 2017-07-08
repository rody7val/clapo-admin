import React from 'react'
import firebase from 'firebase'
import moment from 'moment-with-locales-es6'
import { Route, Link} from 'react-router-dom'
import { Container, Row, Col, Card, Button, CardHeader, CardFooter, CardBlock, CardTitle, CardText, Alert } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../../../css/Banners.css'
import FileUpload from '../../FileUpload'


class Banners extends React.Component {
	constructor () {
		super();

		this.state = {
			banners: [],
			uploadValue: 0,
			modal: false,
			checked: false,
			cargando: true,
			first: 0
		}

		this.toggle = this.toggle.bind(this);

		this.checked = this.checked.bind(this);
		this.refresh = this.refresh.bind(this);
		this.cargando = this.cargando.bind(this);
		this.noCargando = this.noCargando.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
	}

	cargando () {
		this.setState({
			cargando: true,
			noCargando: false
		});
	}

	noCargando () {
		this.setState({
			cargando: false,
			noCargando: true
		});
	}	

	checked () {
		this.setState({
			checked: true,
		});
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	// Actualizar estado react
	refresh () {
		// refresh files
		firebase.database().ref('banners').on('child_added', (snapshot) => {
			const banner = snapshot.val();
			banner.key = snapshot.getKey();

			this.setState({
				banners: this.state.banners.concat(banner),
				uploadValue: 0
			});
		});

		firebase.database().ref('banners').on('child_removed', (snapshot) => {
			const newBanners = this.state.banners.filter(banner => {
				return banner.key !== snapshot.getKey();
			})

			this.setState({
				banners: newBanners
			});
		});
	}

	// refreshRemoved () {
	// }

	// Subir imagen
	handleUpload (event) {
		this.cargando();
		// storage
		const file = event.target.files[0];
		const storageRef = firebase.storage().ref(`/banners/${file.name}`);
		const task = storageRef.put(file);

		task.on('state_changed', snapshot => {
			let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			this.setState({
				uploadValue: percentage
			});
		}, error => {
			console.log(error.message)
		}, () => {
			// database
			const record = {
				photoURL: this.props.user.photoURL,
				displayName: this.props.user.displayName,
				name: file.name,
				image: task.snapshot.downloadURL,
				created: moment().valueOf()
			};

			const dbRef = firebase.database().ref('banners');
			const newPicture = dbRef.push();
			newPicture.set(record);
			this.checked();
		});
  }


	// Delete storage and database
	handleDelete (event) {
		this.cargando();
		const currentBanner = JSON.parse(event.target.getAttribute('data'));
		console.log( currentBanner );
		// storage
		const storageRef = firebase.storage().ref(`/banners/${currentBanner.name}`);
		storageRef.delete()
			.then(() => {
				// database
				const dbRef = firebase.database().ref('banners');
				dbRef.child(currentBanner.key).remove()
					.then(() => {
						console.log('Banner Eliminado!');
						this.checked();
					})
					.catch(error => console.log(`Error ${error.code}: ${error.message}`));
			})
			.catch(error => console.log(`Error ${error.code}: ${error.message}`));

	}

	// Cuando se renderiza App en el DOM
	componentWillMount () {
		if (this.state.first===0) {
			this.refresh();
		}
		if (this.state.checked) {
			this.refresh();
		}
	}

	componentDidMount () {
		this.noCargando();
		this.setState({first: this.state.first++, checked: false});
	}

	render() {
		const { user, anchor } = this.props
		// this.refresh()

		return (
			<div>
				<Card>
					<CardHeader tag='h3'>Banners</CardHeader>
					<CardBlock>
						<Container>
							<Row>

								<Col sm={12} md={12} lg={4}>
									<h5>Nuevo</h5><hr/>
									<FileUpload onUpload={this.handleUpload} uploadValue={this.state.uploadValue}/>
									<br/>
								</Col>

								<Col sm={12} md={12} lg={8}>
									<h5>Listado</h5><hr/>
									{ 
										this.state.banners.length ? this.state.banners.map( (banner, index) => (
										<div key={index}>
											<img width='100%' className='banner-img' src={banner.image} alt=''/>
												<p className='text-center'><i><small>{banner.name}</small></i></p>
											<p><b>Subido por:</b></p>
												<div className='banner-created'>

													<div className='banner-created-block'>
														<img width='50' className='img-user' src={banner.photoURL} alt={banner.displayName}/>
													</div>
													<div className='banner-created-block'>
														<span>{banner.displayName}</span>
														<p>
														  <small>{moment(banner.created).calendar()}</small>
														</p>
													</div>
													<div className='banner-created-block'>
														<input type='button' value='Eliminar.' data={JSON.stringify(banner)} className='btn btn-sm btn-outline-danger' onClick={this.handleDelete}/>
													</div>

												</div>
												<hr/>
											</div>
            			  )).reverse() : (
											<Alert color="info">No hay Banners</Alert>
            			  )
            			}
								</Col>

							</Row>
						</Container>
					</CardBlock>
				</Card>
			</div>
		);
	}
}

export default Banners;
// <Link to={`/site/${anchor}/${banner.key}/${banner.name}/delete`} className='btn btn-outline-danger' >Eliminar</Link>