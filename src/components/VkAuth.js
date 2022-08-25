import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

class VkAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isProcessing: false,
    };
  }

  componentDidMount() {
    if (document.getElementById("vk-sdk")) {
      this.sdkLoaded();
    }
    this.asyncInit();
    this.loadSdkAsync();
  }

  asyncInit() {
    const { apiId } = this.props;
    window.vkAsyncInit = () => {
      window.VK.init({ apiId });
      window.VK.Auth.getLoginStatus();
      this.setState({ isLoaded: true });
    };
  }

  sdkLoaded() {
    this.setState({ isLoaded: true });
  }

  loadSdkAsync() {
    const el = document.createElement("script");
    el.type = "text/javascript";
    el.src = "https://vk.com/js/api/openapi.js?";
    el.async = true;
    el.id = "vk-sdk";
    document.getElementsByTagName("head")[0].appendChild(el);
  }

  checkLoginState = (response) => {
    this.setState({ isProcessing: false });
    this.props.callback(response);
  };

  handleClick = () => {
    if (
      !this.state.isLoaded ||
      this.state.isProcessing ||
      this.props.disabled
    ) {
      return;
    }
    const { settings } = this.props;
    this.setState({ isProcessing: true });
    window.VK.Auth.login(this.checkLoginState, settings);
  };

  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={this.handleClick}
        sx={{
          mr: 1, mb: 1
        }}
      >
        Login
      </Button>
    );
  }
}

VkAuth.propTypes = {
  disabled: PropTypes.bool,
  callback: PropTypes.func.isRequired,
  apiId: PropTypes.string.isRequired,
  settings: PropTypes.number.isRequired,
  containerStyle: PropTypes.object,
};

export default VkAuth;
