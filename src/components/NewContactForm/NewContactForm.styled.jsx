import { ErrorMessage } from 'formik';
import styled from 'styled-components';

export const MyErrorMsg = styled(ErrorMessage)`
  position: absolute;
  left: 0;
  bottom: -30px;
  color: red;
`;

export const Wrapper = styled.div`
  display: block;
  position: relative;
  min-height: 50px;
  margin-bottom: 50px;
`;
