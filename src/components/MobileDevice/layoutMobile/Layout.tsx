import styled from "styled-components";
import { Outlet } from "react-router-dom";
// import Header from "../../Header/Header";
// import SideBar from "../../SideBar/SideBar";
const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  height: 100vh;
  background: 
    radial-gradient(circle, transparent 20%, rgba(0, 0, 0, 0.7) 100%),
    url(../../../../backround-login.png);
  background-size: cover; /* Adjust as needed */
  background-position: center; /* Adjust as needed */
  background-repeat: no-repeat;
`;

const HeaderWrapper = styled.div`
  grid-column: span 12;
  grid-row: span 1;
`;

const SidebarWrapper = styled.div`
  grid-column: span 2;
  grid-row: span 11;
`;

const MainContentWrapper = styled.div`
  grid-column: span 12;
  grid-row: span 12;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      {/* <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <SidebarWrapper>
        <SideBar />
      </SidebarWrapper> */}
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper> 
    </LayoutContainer>
  );
};

export default Layout;
