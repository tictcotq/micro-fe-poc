import React from 'react';

class MicroFrontend extends React.Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    const { name, host, document } = this.props;
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        const script = document.createElement('script');
        script.id = scriptId;
        script.crossOrigin = '';
        script.src = `${host}${manifest.files['main.js']}`;
        script.onload = this.renderMicroFrontend;
        document.head.appendChild(script);
      });
  }

  componentWillUnmount() {
    const { name, window } = this.props;

    // window[`unmount${name}`](`${name}-container`);
  }

  renderMicroFrontend = () => {
    const { name, window, history, text } = this.props;

    // window[`render${name}`](`${name}-container`, history, text);
    // debugger
    this.setState({loaded: true})
  };

  render() {
    if (this.state.loaded) {
      const Comp = window[`render${this.props.name}`]
      return <main id={`${this.props.name}-container`}>
          {this.state.loaded && React.cloneElement(Comp(), {text: this.props.text})}
        </main>
    }

    return null
    
  }
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;