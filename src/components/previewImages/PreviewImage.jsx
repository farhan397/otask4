import { Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './PreviewImage.css';


const PreviewImage =(props)=> {

    
    const handelClose = () => {
        props.onClose()
    }


    return (

        <Modal size="lg" show={props.show} onHide={handelClose} >

            <Modal.Header  closeButton>
               
            </Modal.Header>
            <Modal.Body> <img className='modalimage' src={props.previewdata.img_src} /></Modal.Body>
            <Modal.Title >
                <Container><p >Taken Date : {props.previewdata?.earth_date}</p>
                    <p>Rover Name : {props.previewdata.rover?.name}</p>
                </Container>
            </Modal.Title>
        </Modal>

    );
}

export default PreviewImage;