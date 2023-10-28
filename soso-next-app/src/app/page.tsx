"use client";
import Head from 'next/head';
import Header from './components/header';
import Form from './components/forms/form';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  min-height: 100vh;
  background-color: black; /* Set the background color to black */
  color: white; /* Set the text color to white */
`;

const FormsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

const FormWrapper = styled.div`
  margin: 10px;
`;

const Home: React.FC = () => {
  return (

    <div>
      <Header />
      <PageContainer>
        <Form/>
      </PageContainer>
    </div>
  );
};

export default Home;
