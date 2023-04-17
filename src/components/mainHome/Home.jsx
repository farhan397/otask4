import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineEye } from 'react-icons/ai';
import { useGlobleData } from '../../context/context';
import PreviewImage from '../previewImages/PreviewImage';
import './home.css';
const Home = (props) => {
  const [textState, setTextState] = useState(false)

  const [previewdata, setPreviewdata] = useState('')
  const [gridButtonShow, setGridButtonShow] = useState(false)
  const [previewDataShow, setPreviewDataShow] = useState(false)
  let { state, dispatch } = useGlobleData();
  let timevariable = 2000;
  
  //Grid button show useeffect
  useEffect(() => {
    if(state.storedImages.length>=10){
      setGridButtonShow(true)  
    }
   else{
      setGridButtonShow(false)
  
    }
  }, [state.storedImages.length])



  //api fetch data useeffect
  useEffect(() => {
    getdataByApi()
  }, [props?.searchValue.date, props?.searchValue.name])
//end



//Image palce change useeffect
  useEffect(() => {
    let index1, index2, interval;

    const regenerate = (first, sec) => {
      dispatch({
        type: "load_images", payload: state.imag.map((value, index) => {
          if (index === first) {
            const newValue = { ...state.imag[sec] };
            newValue.swapped = true;
            return newValue;
          } else if (index === sec) {
            const newValue = { ...state.imag[first] };
            newValue.swapped = true;
            return newValue;
          } else {
            return { ...value };
          }
        })
      });
    };

    interval = setInterval(() => {
      index1 = Math.floor(Math.random() * state?.imag.length)
      index2 = Math.floor(Math.random() * state?.imag.length)

      if (index1 != index2) {

        regenerate(index1, index2)
      }

    }, timevariable)

    return () => {
      clearInterval(interval)
    }

  }, [state.imag])
//end



//api data Fetch function
  const getdataByApi = async () => {
    const getData = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${props.searchValue.date}&api_key=5qUx9TEgay0y72z70NL97uFOh4efZsKgFi3CvI1S`)
    const viewdata = getData.data
    let filteredData = viewdata.photos?.filter((obj) => obj.camera.name === props.searchValue.name)

    if (filteredData) {

      dispatch({
        type: 'load_images',
        payload: filteredData
      })
      setTextState(true)
    }

  }
//end

//add images in cart function
  const addImages = (data) => {   
      dispatch({
        type: 'Add_images',
        payload: data
      })
    

  }

  //delete images function
  const removeImages = (data) => {

    dispatch({
      type: 'Remove_images',
      payload: data
    })

  }


  const handleClose = () => setPreviewDataShow(false);


  //image Thumbnail function to preview image in modal
  const previewImages = (data) => {

    setPreviewdata(data)
    setPreviewDataShow(true)
  }



  return (<>
    <Container className='mt-3'>
      <PreviewImage show={previewDataShow} previewdata={previewdata} onClose={handleClose} />
      <div className='homeText'>   {textState ? <h3 className=''>Please Click on Image to  Select </h3> :
        <h3>Please Fill all fields and Search</h3>}      
      </div>
   {gridButtonShow?<button className='headerButton Headerborders text-black' onClick={() => { props.GridShow() }}>Start Grid </button>:''}
      <Row lg={5} md={4} sm={3} xs={2} className='mt-4' >
        {
         state.imag?.map((obj) => {
          const containerClasses = obj.swapped ? "mb-3 imageContainer imageChange" : "mb-3 imageContainer";
          return (
            <Col className={containerClasses}>
              {state.storedImages?.some((checkObj) => checkObj.id === obj.id) ?
                <img className='image selected' variant="top"  src={obj.img_src} onClick={() => { removeImages(obj.id) }} />
                :
                <img className='image' variant="top" src={obj.img_src} onClick={() => { addImages(obj) }} />
              }
              <button className='previewButton  ' onClick={() => { previewImages(obj) }}><AiOutlineEye /></button>
            </Col>
          );
        })
        
        }

      </Row>


    </Container>

  </>
  )
}

export default Home
