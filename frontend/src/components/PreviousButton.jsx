import "./PreviousButton.css"
const PreviousButton=()=>{
    const handlerBack=()=>{
        history.back();
    }
    return(
        <div className='header-card-previous' onClick={handlerBack}>
            <i className="bi bi-chevron-left"></i>
        </div>
    );
}

export default PreviousButton;