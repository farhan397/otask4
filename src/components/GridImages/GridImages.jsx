import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useGlobleData } from '../../context/context';
import './GridImages.css';



const GridImages = (props) => {
    const [displayArray, setDisplayArray] = useState([])
    let { state, dispatch } = useGlobleData();


    useEffect(() => {
        let index1, index2, interval;

        const regenerate = (first, sec) => {
            dispatch({
                type: "Add_gridimages", payload: state.gridImages.map((value, index) => {
                    if (index === first) {
                        const newValue = { ...state.gridImages[sec] };
                        newValue.swapped = true;
                        return newValue;
                    } else if (index === sec) {
                        const newValue = { ...state.gridImages[first] };
                        newValue.swapped = true;
                        return newValue;
                    } else {
                        return { ...value };
                    }
                })
            });
        };

        interval = setInterval(() => {
            index1 = Math.floor(Math.random() * state?.gridImages.length)
            index2 = Math.floor(Math.random() * state?.gridImages.length)

            if (index1 != index2) {

                regenerate(index1, index2)
            }

        }, 2000)

        return () => {
            clearInterval(interval)
        }

    }, [state.gridImages])




    useEffect(() => {

        let timeInterval = 1000;
        let interval = setInterval(() => {
            if (displayArray.length < state.storedImages.length) {

                setDisplayArray([...state.storedImages.slice(0, displayArray.length + 1)]);

            }
        }, timeInterval);

        return () => {
            clearInterval(interval);
        };
    }, [displayArray.length, state.gridImages]);



    const onBack = () => {
        props.onBack();
    }



    return (


        <Container className='mt-5'>
            <button className='backButton mb-2 me-2' onClick={onBack} >← Back</button>
            <span className=' me-1 '>Grid Images</span>

            <Row lg={4} className='mt-4 '>
                {
                    displayArray.length < state.gridImages.length ? displayArray.map((obj) => {
                        console.log('containerClasses') 
                        return (<>
                            <Col className='mb-4' style={{ width: '7rem' }} key={obj.id}>
                                <Card className='cardClass' >
                                    <img className='imageView' src={obj.img_src} />
                                </Card>
                            </Col>
                        </>)
                    }) :
                        state.gridImages.map((obj) => {
                            const containerClasses = obj.swapped ? "mb-3 imageChangeGrid" : "mb-3 imageView";
                           console.log(containerClasses) 
                         return (<>
                                <Col className='mb-4' style={{ width: '7rem' }} key={obj.id}>
                                    <Card className='cardClass'>
                                        <img className={containerClasses} src={obj.img_src} />

                                    </Card>
                                </Col>
                            </>)
                        })
                }
            </Row>


        </Container>



    )
}

export default GridImages
