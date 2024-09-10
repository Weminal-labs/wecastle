import React from 'react';
import styled from 'styled-components';

interface CustomButtonProps {
  content: string;
  onClick: () => void;
  disabled: boolean;
}

const CustomButton = ({ content, onClick, disabled }: CustomButtonProps) => {
  return (
    <ButtonContainer>
      <ButtonStyled onClick={onClick} disabled={disabled}>
        {content}
      </ButtonStyled>
    </ButtonContainer>
  );
};

// Styled component for the button container
const ButtonContainer = styled.div`
  display: inline-block;
  padding: 3px; 
  background-color: black;
  margin-top: 10px;
`;

// Styled component for the button
const ButtonStyled = styled.button`
  width: 120px;
  height: 40px;
  font-size: 18px;
  border: 3px solid #777;
  border-top: none;
  border-left: none;  
  letter-spacing: 2px;
  cursor: pointer;
  color: black;
  background-color: white;
`;

export default CustomButton;
