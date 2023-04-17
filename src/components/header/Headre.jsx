import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { AiFillDelete, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useGlobleData } from '../../context/context';
import Home from '../mainHome/Home';
import PreviewImage from '../previewImages/PreviewImage';
import './Header.css';
import GridImages from '../GridImages/GridImages';


const Headre = () => {
    const [show, setShow] = useState(false)
    const [gridShow, setGridShow] = useState(false)
    const [previewdata, setPreviewdata] = useState('')
    let { state: { storedImages }, dispatch } = useGlobleData()
    const [searchValue, setSearchValue] = useState('')
    const [valuee, setValuee] = useState({
        name: '',
        date: ''
    })



    const onBack = () => {
        setGridShow(false)
    }


    //handel search functionality function
    const handeSubmit = () => {
        if (valuee.name !== '' && valuee.date !== '') {
            dispatch({
                type: 'Empty_images',
                payload: []
            })
            setSearchValue(valuee)

        }
        else {

            alert('Select Data')
        }


    }
    //store data fron input to states
    const handel = (e) => {
        let namee = e.target.name
        let value = e.target.value

        setValuee({ ...valuee, [namee]: value })

    }

    const handleClose = () => setShow(false);

    //image Thumbnail function to preview image in modal
    const previewImages = (data) => {
        setPreviewdata(data)
        setShow(true)
    }


    // delete one image funtion
    const removeImages = (data) => {
        dispatch({
            type: 'Remove_images',
            payload: data
        })
    }

    //Remove all images from state function
    const removeAllImages = () => {
        dispatch({
            type: 'Empty_Storeimages',
            payload: []
        })
    }

    //grid data handel function
    const GridShow = () => {
        dispatch({
            type: 'Add_gridimages',
            payload: storedImages
        })
        setGridShow(true)

    }
    return (
        <>
            <PreviewImage show={show} previewdata={previewdata} onClose={handleClose} />
            <Navbar bg="light" expand="lg">
                <Container fluid>


                    <div className=' form-control  '>
                        <div className='maindiv mt-1   p-2 pb-4 '>
                            <Navbar.Brand className='text-white  headfont mt-3'>Search API Data</Navbar.Brand>
                            <Form.Select className='headersfild Headerborders '
                                onChange={handel}
                                name='name'
                                value={valuee.name} >
                                <option > Cameras  </option>
                                <option >FHAZ</option>
                                <option >RHAZ</option>
                                <option > MARDI</option>
                                <option > MAST</option>
                            </Form.Select>

                            <Form.Control className='headersfild Headerborders' name='date' value={valuee.date} onChange={handel} type='date' />

                            <button onClick={handeSubmit} className='mt-3 bg-primary Headerborders  headerButton'>Search</button>


                            <Nav>   <Dropdown className='mt-3 Headerborders me-2'>
                                <Dropdown.Toggle >
                                    <span >  Cart Images:</span><span className='numberBox Headerborders'>{storedImages.length}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='w-100 Headerborders mt-1 pl-5'>


                                    {storedImages?.map((obj) => {

                                        return (
                                            <>
                                                <div className='menuItems'> <img className='cartImages' src={obj.img_src} />
                                                    <span className='dropdownItembtn'>  <button className='headerremovebtn' onClick={() => { removeImages(obj.id) }}>< AiOutlineDelete /> </button>
                                                        <button className='headerviewbtn' onClick={() => { previewImages(obj) }}><AiOutlineEye /></button>
                                                    </span>  </div></>

                                        );
                                    })}

                                    <span type='button' className='removeAllbtn' onClick={removeAllImages}>Remove All<AiFillDelete /></span>
                                </Dropdown.Menu>
                            </Dropdown></Nav>

                        </div>   </div>
                </Container></Navbar>

            {!gridShow ? <Home searchValue={searchValue} GridShow={GridShow} /> : <GridImages onBack={onBack} />
            }

        </>
    )
}

export default Headre

