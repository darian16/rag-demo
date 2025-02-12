import * as React from 'react';

import { useTranslation } from 'react-i18next';

import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// ===============================|| EVENT LOGS ||=============================== //

const CustomTextField = ({id, label, static_label, required, default_value, value, disabled, size, type, max_length, multiline, rows, onChange, lazy_time, onClick}) => {
	const { t } = useTranslation();

  let type_timeout = null;

  function lazyOnChange() {
    if (!onChange) return;

    if (type_timeout) clearTimeout(type_timeout);
    type_timeout = setTimeout(function () { onChange() }, lazy_time||1500);
  }

  return (
  	<Grid item xs={12} md={size || 12}>
      {
        static_label &&
        <label>{t(label)}</label>
      }

      {
        disabled &&
        <TextField 
          id={id} 
          name={id} 
          type={'text'}
          label={(value || static_label) ? null : t(label)} 
          required={required} 
          defaultValue={default_value}
          value={t(label) + ": " + (value?.toString() || default_value?.toString() || '')}
          disabled={true}
          multiline={multiline}
          rows={rows}
        />
      }

      {
        !disabled &&
        <TextField 
          id={id} 
          name={id} 
          type={type || 'text'}
          label={(value || static_label) ? null : t(label)} 
          required={required} 
          defaultValue={default_value}
          disabled={false}
          multiline={multiline}
          rows={rows}
          onChange={() => lazyOnChange()}
          inputProps={{ maxLength: max_length || 1000 }}
          InputProps={onClick ? {
            endAdornment: (
              <InputAdornment position="end">
                {
                  <IconButton edge="end" color="primary" onClick={onClick}>
                    <MoreHorizIcon />
                  </IconButton>
                }
              </InputAdornment>
            ),
            readOnly: false
          } : null}
        />
      }
  	</Grid>
  )
};

export default CustomTextField;
