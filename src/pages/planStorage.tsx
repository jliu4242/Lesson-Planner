import React from "react";
import LoginPage from '../components/loginPage.tsx'

const BlankPage: React.FC = () => {
  // Completely blank page that still fills the space
  return (
  <>
    <div className="w-full h-full" />
    <LoginPage />
  </>
  )
};

export default BlankPage;