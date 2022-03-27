import react from 'react';

const Card = ({img,album,name}) => {
    return <div>
        <img src={img}/>
        <p>{album}</p>
        <p>{name}</p>
    </div>
}

export default Card;
