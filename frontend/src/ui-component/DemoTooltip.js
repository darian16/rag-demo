import { Tooltip } from 'react-tooltip';
//---------------------------------------------------------------

const DemoTooltip = ({id}) => {
  return <Tooltip id={id} opacity={1} style={{ backgroundColor: "var(--tooltip_color)", color: "#ffffff", zIndex: "10000", maxWidth: "500px" }} />
};
//---------------------------------------------------------------

export default DemoTooltip;
//---------------------------------------------------------------
