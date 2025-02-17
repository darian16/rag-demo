import { Tooltip } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

export const LinkButton = ({href, title, enterDelay, style}) => {
  return (
    <a id="launch-link" href={href} target="_blank" rel="noreferrer" style={ !!style && style }>
      <Tooltip
        title={title}
        enterDelay={enterDelay || 300}
      >
        <LaunchIcon id="launch" />
      </Tooltip>
    </a>
  );
};
