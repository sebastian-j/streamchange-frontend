import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default class WelcomeDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true, videoLink: '' };
    this.sendVideoLink = this.sendVideoLink.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
  }

  sendVideoLink() {
    if (typeof this.props.passVideo === 'function') {
      this.props.passVideo(this.state.videoLink);
    }
  }

  handleInputValueChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    if (value.length < 140) {
      this.setState({
        [name]: value,
      });
    }
  }

  render() {
    return (
      <div className="blur">
        <Dialog
          open={this.state.isOpen}
          onClose={this.closeDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Wybierz, na którym streamie organizujesz giveaway</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="videoLink"
              onChange={this.handleInputValueChange}
              id="videoLink"
              label="Wklej link do streama"
              type="text"
              value={this.state.videoLink}
              fullWidth
            />
            <DialogContentText>
              <span style={{ fontSize: '0.8rem' }}>
                Przykład: https://www.youtube.com/watch?v=CBUBY45me_A
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.sendVideoLink} color="primary">
              Dalej
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

WelcomeDialog.propTypes = {
  passVideo: PropTypes.func,
};
