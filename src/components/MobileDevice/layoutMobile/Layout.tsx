import styled from "styled-components";
import { Outlet } from "react-router-dom";
import "@fontsource/vt323";
import SideBar from "../../layout/SideBar";
import MobileHeader from "../../layout/Header/MobileHeader";

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  height: 100vh;
  background: radial-gradient(
      72.4% 40.52% at 50% 50%,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    )
  background-size: cover; /* Adjust as needed */
  background-position: center; /* Adjust as needed */
  background-repeat: no-repeat;
`;

const MainContentWrapper = styled.div`
  grid-column: span 12;
  grid-row: span 12;
`;

const SideBarWrapper = styled.div`
  grid-column: span 12;
  grid-row: span 12;
`;

const HeaderWrapper = styled.div`
  grid-column: span 12;
  grid-row: span 12;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <HeaderWrapper>
        <MobileHeader />
      </HeaderWrapper>
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
      <SideBarWrapper>
        <SideBar />
      </SideBarWrapper>
    </LayoutContainer>
  );
};

export default Layout;
