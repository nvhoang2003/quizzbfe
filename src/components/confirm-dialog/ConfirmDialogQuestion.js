import PropTypes from 'prop-types';
// @mui
import { Dialog, Button, DialogTitle, DialogActions, DialogContent, Stack } from '@mui/material';

// ----------------------------------------------------------------------

ConfirmDialogQuestion.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
};

export default function ConfirmDialogQuestion({ title, content, action, open, onClose, ...other }) {

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other} >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions >
        <Stack direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent={'center'} alignItems={'center'}>

          {action}
        </Stack>

      </DialogActions>
    </Dialog>
  );
}
