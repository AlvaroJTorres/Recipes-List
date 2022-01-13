import React from "react";
import styled from "@emotion/styled";

const StyledInput = styled.input`
  width: 70%;
  margin: 0 auto;
  border: none;
  background: #faf2ed;
  padding: 10px;
  border-radius: 10px;
  display: block;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 2em;
  color: #eb9e6e;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 2em;
  color: red;
`;

export default function Search({ query, setQuery, loading, error }) {
  return (
    <div>
      <StyledInput
        placeholder="Food"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <LoadingText>Loading...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
