import ErrorMessage from "components/etc/ErrorMessage";
import LoadingMessage from "components/etc/LoadingMessage";
import MobileLayout from "components/layout/MobileLayout";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <MobileLayout>
      <ErrorMessage/>
    </MobileLayout>
  );
};

export default ErrorPage;
