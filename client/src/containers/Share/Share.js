import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
class Share extends Component {
    onSubmit(formValues) {
        console.log('Form was submitted:', formValues);
      }

      validate(formValues) {
        console.log('Validating:', formValues);
      }

      render() {
        return (
            <div className="container col-md-4">
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
                                <label> Add an Image </label>
                                <p>We live in a visual culture. Upload an image of the item you're sharing.</p>
                                <Field name="image">
                                    {({ input, meta }) => <input type="file" {...input} />}
                                </Field>
                            </div>
                            <div>
                                <label>Add a Title & Description</label>
                                <p>Title</p>
                                <Field name="title">
                                    {({ input, meta }) => <input type="text" {...input} />}
                                </Field>
                                <p>Description</p>
                                <Field name="description">
                                    {({ input, meta }) => <input type="text" {...input} />}
                                </Field>
                            </div>
                            <div>
                                <label>Categorize Your Item</label>
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
                            </div>
                        </form>
                )}
                />


            </div>
        );
      }
}


export default Share;
