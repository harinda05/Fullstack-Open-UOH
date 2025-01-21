const Notification = ({ type, message }) => {
    if (message === null) {
      return null
    }
  
    if(type === 'success' ){
        return (
            <div className='successMsg'>
              {message}
            </div>
          )
    } else if ( type === 'failure' ) {
        return (
            <div className='failure'>
              {message}
            </div>
          )
    }
    
  }

export default Notification