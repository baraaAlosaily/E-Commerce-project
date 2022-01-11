import styled from "styled-components";
import React from 'react'

const Container=styled.div`
height: 30px;
background-color:teal;
color: White;
display: flex;
justify-content: center;
align-items: center;
font-size: 14;
font-weight: 500;
`

const Announcement = () => {
    return (
        <div>
            <Container>
                Super Deal! Free Shipping on Orders Over $50
            </Container>
        </div>
    )
}

export default Announcement
