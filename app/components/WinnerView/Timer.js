import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
  color: gray;
  margin-left: auto;
`;

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: '', interval: null };
  }

  componentDidMount() {
    this.setState({ display: '0:00' });
    const start = new Date().getTime();
    const t = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - start;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((distance % (1000 * 60)) / 1000);
      this.setState({ display: `${minutes}:${sec < 10 ? '0' : ''}${sec}` });
    }, 1000);
    this.setState({ interval: t });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return <Span>{this.state.display}</Span>;
  }
}
