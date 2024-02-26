import { useState, useEffect, useRef } from "react";
import axios from "axios";

export function SlideShow(){

    const [products, setProducts] = useState({})
    const [count , setCount] = useState(1)
    const [status, setStatus] = useState()
    
    var clickRef = useRef(null)
    var PlayRef = useRef(null)
    var TimerRef = useRef(0)

    function LoadData(count){
        axios.get(`https://fakestoreapi.com/products/${count}`)
        .then(response=>setProducts(response.data))
    }
    
    function HandleNextClick(){
    clickRef.current = clickRef.current +1 
    LoadData(clickRef.current)
    }
    function HandlePrevClick(){
     clickRef.current = clickRef.current -1 
     LoadData(clickRef.current)
   }

   function SlideShowPlay(){
    PlayRef.current =   setInterval(HandleNextClick, 5000)
    setStatus('Playing')
   }
   function SlideShowPause(){
    clearInterval(  PlayRef.current ) 
    setStatus('Pause')

   }
    
    useEffect(()=>{
        LoadData(1)
    },[])

    return(
        <div className="container-fliud ">
            <div className="mt-5 justify-content-center  d-flex" >
            <div className=" card " style={{width:'600px'}}>
                <div className="card-header">
                      <h2>Title: {products.title}</h2>
                </div>
                <div className=" card-body" >
                    <div className="row h-100">
                        <div className="col-1 d-flex flex-column justify-content-center" >
                            <button onClick={HandlePrevClick} className="bi bi-chevron-left btn bg-dark text-white" ></button>
                        </div>
                        <div className="col-10 "  >
                            <img src={products.image} alt="" height='380px' width="100%" />
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center">
                            <button onClick={HandleNextClick} className="bi bi-chevron-right btn bg-dark text-white" ></button>
                        </div>
                    </div>

                </div>
                <div className="card-footer text-center">
                    <div className=" card-subtitle text-start">Price:{products.price}</div>
                    <p>Slide Show: {status}</p>
                    <button onClick={SlideShowPlay} className="bi bi-play btn btn-success" ></button>
                    <button onClick={SlideShowPause} className="bi bi-pause btn btn-warning ms-5"></button>
                </div>

            </div>
            </div>
        </div>
    )
}