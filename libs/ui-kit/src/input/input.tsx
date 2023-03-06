import { TextField } from "@mui/material";
import React from "react";
import { TextFieldProps } from "@mui/material/TextField/TextField";

export class Input extends React.Component<TextFieldProps> {
  visibleProps!: TextFieldProps;
  valueRef = React.createRef<HTMLInputElement>();
  state = {
    value: undefined as unknown,
  };

  constructor(public props: TextFieldProps) {
    super(props);

    const { value, ...visibleProps } = this.props;
    this.visibleProps = visibleProps;
    // @ts-ignore
    this.state = {
      value
    };
  }

  render() {
    return <TextField
      {...this.props}
      value={ this.state.value}
      onChange={ event => this.setState({ value: event.target.value }) }
      ref={this.valueRef}
    />
  }

}

