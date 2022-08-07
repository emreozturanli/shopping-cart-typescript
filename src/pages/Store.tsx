import { Col, Row } from 'react-bootstrap'
import StoreItem from '../components/StoreItem'
import StoreItems from '../data/items.json'

const Store = () => {
    return (
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className='g-3'>
                {StoreItems.map((e) =>{
                    return <Col key={e.id}>
                        <StoreItem {...e}/>
                        </Col>
                })}
                
            </Row>
        </>
    )
}

export default Store