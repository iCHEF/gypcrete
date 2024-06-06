const flexRowStyle = {
  display: 'flex',
  marginBottom: 10,
};

function FlexRow({ children }) {
  return <div style={flexRowStyle}>{children}</div>;
}

export default FlexRow;
