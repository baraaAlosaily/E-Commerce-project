import { Remove , Add} from "@material-ui/icons";
import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { mobile } from "../responsive";
import StripeCheckout from 'react-stripe-checkout';
import { useState ,useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
require('dotenv').config();


const Container=styled.div`
`
const Wrapper=styled.div`
padding: 20px;
${mobile({padding: "5px" })}

`
const Title=styled.h1`
font-weight: 200;
text-align:center;
`
const Top=styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
`

const TopButton=styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
border: ${props=>props.type==="field" && "none"};
background-color: ${props=>props.type==="field" ?"black":"transparent"};
color: ${props=>props.type==="field" && "white"};
`
const TopTexts=styled.div`
  ${mobile({  display: "none"})}

`
const TopText=styled.span`
text-decoration: underline;
cursor: pointer;
margin: 0px 10px ;
`

const Bottom=styled.div`
display: flex;
justify-content: center;
${mobile({  flexDirection:"column"})}
align-items: center;

`
const Info=styled.div`
flex: 3;
`
const Summary=styled.div`
flex: 1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding:20px;
height: 50vh;
`

const Product=styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20px;
${mobile({flexDirection:"column"})}

`;
const ProductDetail=styled.div`
flex: 2;
display: flex;
`;
const Image=styled.img`
width: 200px;
${mobile({  width: "150px"})}

`;
const Details=styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
`;
const ProductName=styled.span``;
const ProductId=styled.span``;
const ProductColor=styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props=>props.color};
`;
const ProductSize=styled.span``
const PriceDetail=styled.div`
flex: 1;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;

`;
const ProductAmountContainer=styled.div`
display: flex;
align-items: center;
justify-content: center;

`;
const ProductAmount=styled.div`
padding-top: 10px;
font-size: 24px;
margin: 5px;
margin-bottom: 20px;
`;
const ProductPrice=styled.div`
font-size: 30px;
font-weight: 200;
`;
const Hr=styled.div`
background-color: #eee;
border: none;
height: 1px;
`;

const SummaryTitle=styled.h1`
font-weight:200 ;
`
const SummaryItem=styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;
font-weight: ${props=>props.type==="total"&&"500"};
font-size: ${props=>props.type==="total"&&"24px"};
`
const SummaryItemText=styled.span``
const SummaryItemPrice=styled.span``
const Button=styled.div`
width: 100%;
padding:10px;
background-color: black;
color: white;
display: flex;
justify-content: center;
justify-items: center;
`

const Cart = () => {
  const cart=useSelector(state=>state.cart);
  const[stripeToken,setStripeToken]=useState(null);
  const key= "pk_test_51KOIf0GqdYCTlmgtyqXafpKNJ6RBwtRTm41dpiBOmURbzsXRpuxn5JWHg1ljv8P2ScHxP6nFcrQRjfg8AcuW8O7d00OirM5vT1"
  const history=useHistory();
  const onToken=(token)=>{
    setStripeToken(token);
  }

  useEffect(()=>{
    const makeRequest=async()=>{
      try {
        const res= await axios.post("http://localhost:5000/api/checkout/payment",{
          tokenId:stripeToken.id,
          amount:cart.total*100,
        })
        console.log(res.data);
        history.push("/success",{data:res.data});
      } catch (err) {
        console.log(err);
      }
    }
    stripeToken && makeRequest();
  },[stripeToken,cart.total,history])
  
  console.log(cart);
  return (
      <Container>
          <Navbar/>
          <Announcement/>
          <Wrapper>
              <Title>Your BAG</Title>
              <Top>
                  <TopButton>CONTINUE SHOPPING</TopButton>
                  <TopTexts>
                  <TopText>Shopping Bag(2)</TopText>
                  <TopText>Your wishlist</TopText>
                  </TopTexts>
                  <TopButton type='field' >CHECKOUT NOW</TopButton>
              </Top>
              <Bottom>
          <Info>
            {
              cart.products.map(product=>(
            <Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> {product.price}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
              </PriceDetail>
            </Product>
          ))}  
          <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
                    name='My Shop'
                    image='https://previews.123rf.com/images/distrologo/distrologo1902/distrologo190200778/117610020-plantilla-de-dise%C3%B1o-de-logotipo-de-tienda-minorista-dise%C3%B1o-de-icono-de-logotipo-de-carrito-de-compra.jpg'
                    billingAddress
                    shippingAddress
                    description={`Your total is ${cart.total}`}
                    amount={cart.total*100}
                    token={onToken}
                    stripeKey={key}
            >
            <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
          </Wrapper>
          <Footer/>
      </Container>
  );
};

export default Cart;
