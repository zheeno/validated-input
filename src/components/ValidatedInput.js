import {Form, Input, Item, Label} from 'native-base';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../utils/enums';
import PropTypes from 'prop-types';

const email_regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const number_regex = /^([0-9]+$)/;

class ValidatedInput extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      error: null,
      valid: false,
    };
    this.validate = this.validate.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  validate = () => {
    try {
      this.setState({error: null});
      switch (this.props.type) {
        case 'email':
          if (!email_regex.test(this.state.value))
            throw Error('Valid mail required');
          break;
        case 'number':
          if (!number_regex.test(this.state.value))
            throw Error('Valid number required');
          break;

        default:
          break;
      }
      //   proceed with other logic here
    } catch ({message}) {
      this.setState({error: message});
    }
  };

  onChange = (text) => {
    this.setState({value: text}, () => {
      this.validate();
      if (this.props.onChange) this.props.onChange(text);
    });
  };

  render() {
    return (
      <View>
        <View
          style={[
            styles.inputContainer,
            this.state.error
              ? styles.errorItem
              : this.state.valid
              ? styles.successItem
              : styles.bordered,
          ]}>
          <Form style={{margin: 0}}>
            <Item stackedLabel style={styles.formItem}>
              {this.props.label && <Label>{this.props.label}</Label>}
              <Input
                value={this.value}
                style={styles.input}
                onBlur={() => this.validate()}
                onChangeText={this.onChange}
                keyboardType={
                  this.props.type == 'email'
                    ? 'email-address'
                    : this.props.type == 'number'
                    ? 'number-pad'
                    : 'default'
                }
              />
            </Item>
          </Form>
          {this.state.error && (
            <Text style={styles.errorText}>{this.state.error}</Text>
          )}
        </View>
      </View>
    );
  }
}
export default ValidatedInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 50,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    margin: 0,
  },
  formItem: {
    borderBottomWidth: 0,
    margin: 0,
    borderColor: COLORS.light,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 13,
    color: COLORS.red,
    textAlign: 'right',
    marginHorizontal: 10,
  },
  errorItem: {
    borderWidth: 1,
    borderColor: COLORS.red,
  },
  successItem: {
    borderWidth: 1,
    borderColor: COLORS.orange,
  },
  bordered: {borderColor: COLORS.light, borderWidth: 1},
});

ValidatedInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  onFailure: PropTypes.func
};
