import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  makeSelectGiveawayPrize,
  makeSelectGiveawayRequirement,
} from './selectors';
import { changePrize, changeRequirement } from './actions';
<<<<<<< HEAD
import AdFrame from '../AdFrame';
import Panel from '../Panel';
import PanelTitle from '../Panel/PanelTitle';
import StyledTextField from '../StyledTextField';
import StyledFormControl from '../StyledTextField/StyledFormControl';
import KeywordInput from './KeywordInput';
import LotteryLawWarning from './LotteryLawWarning';
import RaffleWrapper from '../RaffleWrapper';
import WinnerView from '../WinnerView';
import StreamInfo from '../StreamInfo/StreamInfo';

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
            labelId="user-type-select"
            onChange={(event) => this.props.changeReq(event.target.value)}
            value={this.props.requirement}
            variant="standard"
          >
            <MenuItem value={0}>
              <FormattedMessage {...messages.allViewers} />
            </MenuItem>
            <MenuItem value={1}>
              <FormattedMessage {...messages.subscribers} />
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
              variant="standard"
              fullWidth
            />
          )}
        </FormattedMessage>
        <KeywordInput />
        <RaffleWrapper onWin={this.winHandler} />
        <LotteryLawWarning open={this.props.requirement === 1} />
        <StreamInfo
          channel={this.props.channel}
          platform={this.props.platform}
        />
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
=======
import GiveawayRules from './GiveawayRulesComponent';
>>>>>>> 26c03d25033f2016b4e0c6970905ded37534f0dd

const mapStateToProps = createStructuredSelector({
  prize: makeSelectGiveawayPrize(),
  requirement: makeSelectGiveawayRequirement(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePrize: (a) => dispatch(changePrize(a)),
    changeReq: (r) => dispatch(changeRequirement(r)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveawayRules);
