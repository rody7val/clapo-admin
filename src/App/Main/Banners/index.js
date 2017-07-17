import React from 'react'
import firebase from 'firebase'
import moment from 'moment-with-locales-es6'
import { Container, Row, Col, Card, CardHeader, CardBlock, Alert, FormGroup, Input, InputGroup, InputGroupAddon, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import BannerUpload from '../../Forms/BannerUpload'

import 'bootstrap/dist/css/bootstrap.css'
import '../../../css/Banners.css'

class Banners extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			banners: [],
			currentBanner: {},
			desc: '',
			link: '',
			linkName: '',
			uploadValue: 0,
			modal: false
		}

		this.baseState = this.state;

		this.toggle = this.toggle.bind(this);

		this.changeDesc = this.changeDesc.bind(this);
		this.changeLink = this.changeLink.bind(this);
		this.changeLinkName = this.changeLinkName.bind(this);

		this.refresh = this.refresh.bind(this);

		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.handleEditedSave = this.handleEditedSave.bind(this);
		this.handleEditedToggle = this.handleEditedToggle.bind(this);
	}


	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	changeDesc(event) {
		this.setState({desc: this.desc.value})
		event.preventDefault()
	};
	changeLink(event) {
		this.setState({link: this.link.value})
		event.preventDefault()
	};
	changeLinkName(event) {
		this.setState({linkName: this.linkName.value})
		event.preventDefault()
	};

	// Actualizar estado react
	refresh () {
		// add new files
		this.setState({banners: []});
		firebase.database().ref('banners').on('child_added', (snapshot) => {
			const banner = snapshot.val();
			banner.key = snapshot.getKey();

			this.setState({
				banners: this.state.banners.concat(banner),
				uploadValue: 0
			});
		});

		// filter removed file
		firebase.database().ref('banners').on('child_removed', (snapshot) => {
			const newBanners = this.state.banners.filter(banner => {
				return banner.key !== snapshot.getKey();
			})

			this.setState({
				banners: newBanners
			});
		});
	}


	// Subir imagen
	handleUpload (event) {
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
				desc: '',
				link: '',
				linkName: '',
				created: moment().valueOf()
			};

			const dbRef = firebase.database().ref('banners');
			const newPicture = dbRef.push();
			newPicture.set(record);
		});
  }

	handleEditedToggle(event) {
		const currentBanner = JSON.parse( event.target.getAttribute('data'));

		this.setState({
			modal: !this.state.modal,
			currentBanner: currentBanner,
			desc: currentBanner.desc || '',
			link: currentBanner.link || '',
			linkName: currentBanner.linkName || ''
		});

	}

	handleEditedSave(event) {
		// database
		const dbRef = firebase.database().ref('banners');
		const bannerEdit = this.state.currentBanner;
		const key = bannerEdit.key;
		delete bannerEdit.key;
		bannerEdit.desc = this.state.desc;
		bannerEdit.link = this.state.link;
		bannerEdit.linkName = this.state.linkName;

		dbRef.child(key).set(bannerEdit).then(() => {
			this.refresh();
			this.toggle();
		})
	}

	// Delete storage and database
	handleDelete (event) {
		const currentBanner = JSON.parse(event.target.getAttribute('data'));

		// storage
		const storageRef = firebase.storage().ref(`/banners/${currentBanner.name}`);
		storageRef.delete()
			.then(() => console.log('Baaner eliminado del Sistema de Archivos (Storage)!'))
			.catch(error => console.log(`Error ${error.code}: ${error.message}`));

		// database
		const dbRef = firebase.database().ref('banners');
		dbRef.child(currentBanner.key).remove()
			.then(() => {
				console.log('Banner eliminado de la Base de datos!');
			})
			.catch(error => console.log(`Error ${error.code}: ${error.message}`));
	}

	componentDidMount() {
		this.refresh()
	}

	render() {

		return (
			<div>
				<Card>
					<CardHeader tag='h3'>Banners</CardHeader>
					<CardBlock>
						<Container>
							<Row>

								<Col sm={12} md={12} lg={4}>
									<h5>Nuevo</h5><hr/>
									<BannerUpload onUpload={this.handleUpload} uploadValue={this.state.uploadValue}/>
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
													<input
														type='button'
														value='Editar'
														data={JSON.stringify(banner)}
														className='btn btn-sm btn-outline-warning'
														onClick={this.handleEditedToggle}/>
													<input
														type='button'
														value='Eliminar.'
														data={JSON.stringify(banner)}
														className='btn btn-sm btn-outline-danger'
														onClick={this.handleDelete}/>
												</div>
											</div>
											<hr/>
										</div>
            			  )).reverse() : (
											<Alert color="info">Cargando ...</Alert>
            			  )
            			}
								</Col>


									<Modal isOpen={this.state.modal} toggle={this.toggle}>
        					  <ModalHeader toggle={this.toggle}>Editar <i>{this.state.currentBanner.name}</i></ModalHeader>
        					  <ModalBody>
											<FormGroup>
												<input 
													type="text"
													id="desc"
													className='form-control'
													placeholder="Descripción de la imagen"
													ref={(desc) => this.desc = desc}
													value={this.state.desc}
													onChange={this.changeDesc}/>
											</FormGroup>
											<FormGroup>
												<input
													type="text"
													id="linkName"
													className='form-control'
													placeholder="Nombre del link (ej: Leer más)"
													ref={(linkName) => this.linkName = linkName}
													value={this.state.linkName}
													onChange={this.changeLinkName}/>
											</FormGroup>
											<InputGroup>
												<InputGroupAddon>Link</InputGroupAddon>
												<input
													type="text"
													id="link"
													className='form-control'
													placeholder="http://ej.link.com/"
													ref={(link) => this.link = link}
													value={this.state.link}
													onChange={this.changeLink}/>
											</InputGroup>
        					  </ModalBody>
        					  <ModalFooter>
											<Button color="primary" onClick={this.handleEditedSave}>Guardar</Button>{' '}
											<Button color="secondary" onClick={this.toggle}>Cancel</Button>
        					  </ModalFooter>
        					</Modal>

							</Row>
						</Container>
					</CardBlock>
				</Card>
			</div>
		);
	}
}

export default Banners;