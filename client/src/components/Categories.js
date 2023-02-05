import React from 'react';
import { Tab, Tabs, ListGroup, Col, Row } from 'react-bootstrap';

const categories = [
    {
        id: 1,
        name: 'Shakers',
        items: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
        ],
    },
    {
        id: 2,
        name: 'Jiggers',
        items: [
            { id: 4, name: 'Item 4' },
            { id: 5, name: 'Item 5' },
            { id: 6, name: 'Item 6' },
        ],
    },
    {
        id: 3,
        name: 'Strainers',
        items: [
            { id: 7, name: 'Item 7' },
            { id: 8, name: 'Item 8' },
            { id: 9, name: 'Item 9' },
        ],
    },
    {
        id: 4,
        name: 'Muddlers',
        items: [
            { id: 10, name: 'Item 10' },
            { id: 11, name: 'Item 11' },
            { id: 12, name: 'Item 12' },
        ],
    },
];

const Categories = () => {
    return (
        <Row className='justify-content-md-center'>
            <Col md={6} xs={12}>
                <Tabs defaultActiveKey="1">
                    {categories.map(({ id, name, items }) => (
                        <Tab key={id} eventKey={id} title={name}>
                            <ListGroup>
                                {items.map(({ id, name }) => (
                                    <ListGroup.Item key={id}>{name}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Tab>
                    ))}
                </Tabs>
            </Col>
        </Row>
    );
}

export default Categories;
