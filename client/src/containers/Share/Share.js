import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
  } from 'material-ui/Stepper';
  import RaisedButton from 'material-ui/RaisedButton';
  import FlatButton from 'material-ui/FlatButton';
  import TextField from 'material-ui/TextField';
  import './styles.css';

  const styles = {

    underlineStyle: {
      borderColor: 'black'
    },
    floatingLabelStyle: {
        color: 'white'
    }
  };

class Share extends Component {
    state = {
        finished: false,
        stepIndex: 0,
      };

    onSubmit(formValues) {
        console.log('Form was submitted:', formValues);
      }

      validate(formValues) {
        console.log('Validating:', formValues);
      }

      handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2,
        });
      };

      handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
          this.setState({ stepIndex: stepIndex - 1 });
        }
      };

      renderStepActions(step) {
        const { stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={'Next'}
                    disableTouchRipple
                    disableFocusRipple
                    onClick={this.handleNext}
                    style={{ marginRight: 12 }}
                />
                {step > 0 && (
                <RaisedButton
                    label="Back"
                    disabled={stepIndex === 0}
                    disableTouchRipple
                    disableFocusRipple
                    secondary
                    onClick={this.handlePrev}
                />
            )}
            </div>
        );
      }


      render() {
        const { finished, stepIndex } = this.state;
        return (

            <Form
                onSubmit={values => this.onSubmit(values)}
                validate={this.validate.bind(this)}
                render={({ handleSubmit, values }) => (
                    <form
                        onSubmit={e => {
                      e.preventDefault();
                      handleSubmit(values);
                    }}
                    >
                    <div>
                        <Stepper activeStep={stepIndex} orientation="vertical">
                            <Step>
                                <StepLabel> Add an Image </StepLabel>
                                <StepContent>
                                    <p>We live in a visual culture. Upload an image of the item you're sharing.</p>
                                    <Field name="image">
                                        {({ input, meta }) => <input type="file" {...input} />}
                                    </Field>
                                    {this.renderStepActions(0)}
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Add a Title & Description</StepLabel>
                                <StepContent>
                                <p>Folks need to know what you're sharing. Give them a clue by adding a title & description.</p>
                                    <Field name="title">
                                        {({ input, meta }) => (<TextField
                                            hintText="Title"
                                            floatingLabelText="Title"
                                            floatingLabelFixed
                                            underlineFocusStyle={styles.underlineStyle}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            {...input}
                                        />)}
                                    </Field>
                                    <p />
                                    <Field name="description">
                                        {({ input, meta }) => (<TextField
                                            hintText="Description"
                                            floatingLabelText="Description"
                                            multiLine={true}
                                            underlineFocusStyle={styles.underlineStyle}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            rows={3}
                                            {...input}
                                        />)}
                                    </Field>
                                    {this.renderStepActions(2)}
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Categorize Your Item</StepLabel>
                                <StepContent>
                                    <p />
                                    <Field name="tags">
                                        {({ input, meta }) => (<SelectField floatingLabelText="Select Category Tags">
                                            <MenuItem value={1} checked primaryText="Electronics" />
                                            <MenuItem value={2} checked primaryText="Household Items" />
                                            <MenuItem value={3} checked primaryText="Musical Instruments" />
                                            <MenuItem value={4} checked primaryText="Physical Media" />
                                            <MenuItem value={5} checked primaryText="Recreational Equipment" />
                                            <MenuItem value={6} checked primaryText="Sporting Goods" />
                                            <MenuItem value={7} checked primaryText="Tools" />
                                        </SelectField>)}
                                    </Field>
                                    {this.renderStepActions(2)}
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Confirm Things!</StepLabel>
                                <StepContent>
                                    <p>Great! If you're happy with everything, tap the button.</p>
                                    <RaisedButton type="submit" label="Confirm" />            
                                </StepContent>
                            </Step>
                        </Stepper>
                        </div>
                    </form>

                )}
            />
        );
 }
}


export default Share;
