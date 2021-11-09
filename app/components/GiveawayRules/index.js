import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import messages from './messages';
import {
  makeSelectGiveawayPrize,
  makeSelectGiveawayRequirement,
} from './selectors';
import { changePrize, changeRequirement } from './actions';
import AdFrame from '../AdFrame';
import Panel from '../Panel';
import PanelTitle from '../Panel/PanelTitle';
import StyledTextField from '../StyledTextField';
import StyledFormControl from '../StyledTextField/StyledFormControl';
import KeywordInput from './KeywordInput';
import RaffleWrapper from '../RaffleWrapper';
import WinnerView from '../WinnerView';

export class GiveawayRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerId: null,
    };
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.winHandler = this.winHandler.bind(this);
  }

  handleInputValueChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    if (value.length < 140) {
      this.setState({
        [name]: value,
      });
      localStorage.setItem(`gv-${name}`, value);
    }
  }

  winHandler(id) {
    this.setState({
      winnerId: id,
    });
  }

  render() {
    if (this.state.winnerId) {
      return (
        <WinnerView
          apiKey={this.props.apiKey}
          id={this.state.winnerId}
          prize={this.props.prize}
          onClose={() => this.setState({ winnerId: null })}
        />
      );
    }
    return (
      <Panel>
        <PanelTitle>
          <FormattedMessage {...messages.panelTitle} />
        </PanelTitle>
        <StyledFormControl margin="normal">
          <InputLabel id="user-type-select">
            <FormattedMessage {...messages.userTypeLabel} />
          </InputLabel>
          <Select
            onChange={(event) => this.props.changeReq(event.target.value)}
            value={this.props.requirement}
          >
            <MenuItem value={0}>
              <FormattedMessage {...messages.allViewers} />
            </MenuItem>
            <MenuItem value={1}>
              <FormattedMessage {...messages.sponsors} />
            </MenuItem>
          </Select>
        </StyledFormControl>
        <FormattedMessage {...messages.prize}>
          {(label) => (
            <StyledTextField
              autoFocus
              margin="dense"
              name="prize"
              onChange={(event) => {
                this.props.changePrize(event.target.value);
              }}
              label={label}
              type="text"
              value={this.props.prize}
              fullWidth
            />
          )}
        </FormattedMessage>
        <KeywordInput />
        <RaffleWrapper onWin={this.winHandler} />
        <AdFrame />
      </Panel>
    );
  }
}

GiveawayRules.propTypes = {
  apiKey: PropTypes.string.isRequired,
  changePrize: PropTypes.func.isRequired,
  changeReq: PropTypes.func.isRequired,
  prize: PropTypes.string,
  requirement: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  prize: makeSelectGiveawayPrize(),
  requirement: makeSelectGiveawayRequirement(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changePrize: (a) => dispatch(changePrize(a)),
    changeReq: (r) => dispatch(changeRequirement(r)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveawayRules);
