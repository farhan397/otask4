import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useGlobleData } from './src/context/context';
import SelectedImages from './src/components/selectedImages/SelectedImages';



const Mapfile = (props) => {
  
    let { state} = useGlobleData();
   const onBack = () => {
    props.onBack();
}

    return (        <>    <Container className='mt-5'>
        <button className='backButton mb-2 me-2' onClick={onBack} >← Back</button>
        <span className=' me-1 '>Grid Images : <span className='pe-1  '> {state.storedImages.length}</span></span>
                 <Row lg={4} className='mt-4 '>    {
                        state.storedImages?.map((obj) => {
                            return (<>                            
                              { setInterval(()=>{
  <SelectedImages obj={obj} onBack={onBack}  />},8000)} 

}

              
                                      
                                      
                            </>)
                           
                        })}
                   </Row>


            </Container>  

        </>
    )
}

export default Mapfile




import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaEye } from 'react-icons/fa';
import { useGlobleData } from './src/context/context';
import PreviewImage from './src/components/previewImages/PreviewImage';
import './SelectedImages.css';


const SelectedImages = (props) => {    
    const [show, setShow] = useState(false)
    const [previewdata, setPreviewdata] = useState([])
    let { dispatch } = useGlobleData();
    const [propsData,setPropsData]=useState('')
    useEffect(()=>{
let interval= setInterval(()=>{
    setPropsData(props.obj)
},8000)
return ()=>{
    clearInterval(interval)
}
    },[propsData])

    const removeImages = (data) => {
        dispatch({
            type: 'Remove_images',
            payload: data
        })
    }
    const handleClose = () => setShow(false);

  

    const previewImages = (data) => {

        setPreviewdata(data)
        setShow(true)
    }

    return (
        <>   <PreviewImage show={show} previewdata={previewdata} onClose={handleClose} />
           
                    {                    
                        
                                <Col className='mb-4' >
                                    <Card style={{ width: '17rem' }}>
                                        <img className='imageView' src={propsData.img_src} onClick={() => { previewImages(props.obj) }} />
                                        <Card.Body>
                                            <button className='selectbtn' onClick={() => { removeImages(props.obj.id) }}>Unselect ❌ </button>
                                            <button className='previewButton' onClick={() => { previewImages(props.obj) }}> Preview <FaEye /></button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                    
                  
                    }
                

        </>
    )
}

export default SelectedImages
