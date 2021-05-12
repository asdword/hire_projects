import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({ title, children, open, handleClose }) {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth='md'>

      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>

    </Dialog>
  );
}