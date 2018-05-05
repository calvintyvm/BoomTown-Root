import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './styles.css';

const ADD_ITEM = gql`
    mutation addItem(
        $title: String!
        $description: String!
        $itemowner: String!
        $imageurl: String!
        $available: Boolean!
        $tags: [String]!
    ) {
        addItem(
            title: $title
            description: $description
            itemowner: $itemowner
            imageurl: $imageurl
            available: $available
            tags: $tags
        ) {
            title
            description
            imageurl
            available
            tags
        }
    }
`;

const names = [
    // write graphql query
    // look into itemscontainer
    { id: 1, title: 'Electronics' },
    { id: 2, title: 'Household Items' },
    { id: 3, title: 'Musical Instruments' },
    { id: 4, title: 'Phyiscal Media' },
    { id: 5, title: 'Recreational Equipment' },
    { id: 6, title: 'Sporting Goods' },
    { id: 7, title: 'Tools' }
];
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
        disabled: true,
        tags: []
    };

    onSubmit(values, addItem) {
        console.log('Submitted!');
    }

    menuItems = tags =>
        names.map(name => (
            <MenuItem
                key={name.id}
                insetChildren
                checked={tags && tags.indexOf(name) > -1}
                value={name}
                primaryText={name.title}
            />
        ));

    validate = formValues => {
        console.log('Validating:', formValues, this.state.tags);
    };

    handleChange = (event, index, tags) => this.setState({ tags });

    handleImage = () => {
        this.setState({ disabled: false });
    };

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2
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
                    disabled={this.state.disabled}
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
        const { tags } = this.state;

        return (
            <Form
                onSubmit={this.onSubmit.bind(this)}
                validate={this.validate.bind(this)}
                render={({ handleSubmit, values }) => (
                    <Mutation mutation={ADD_ITEM}>
                        {(addItem, { data }) => (
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    handleSubmit();

                                    const newItem = {
                                        title: values.title,
                                        description: values.description,
                                        itemowner:
                                            'eEvh1WUF5nb5eeUksUQb3Ph0kOU2',
                                        imageurl: values.image,
                                        available: true,
                                        tags: this.state.tags.map(tag =>
                                            tag.title.toString()
                                        )
                                    };
                                    console.log(newItem);
                                    addItem({ variables: newItem });
                                }}
                            >
                                <div>
                                    <Stepper
                                        activeStep={stepIndex}
                                        orientation="vertical"
                                    >
                                        <Step>
                                            <StepLabel>
                                                {' '}
                                                Add an Image{' '}
                                            </StepLabel>
                                            <StepContent>
                                                <p>
                                                    We live in a visual culture.
                                                    Upload an image of the item
                                                    you're sharing.
                                                </p>
                                                <Field name="image">
                                                    {({ input, meta }) => (
                                                        <input
                                                            type="file"
                                                            accept="image/jpeg, image/png, image/gif"
                                                            id="image"
                                                            {...input}
                                                            onClick={
                                                                this.handleImage
                                                            }
                                                            ref={node => {
                                                                input = node;
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                                {this.renderStepActions(0)}
                                            </StepContent>
                                        </Step>
                                        <Step>
                                            <StepLabel>
                                                Add a Title & Description
                                            </StepLabel>
                                            <StepContent>
                                                <p>
                                                    Folks need to know what
                                                    you're sharing. Give them a
                                                    clue by adding a title &
                                                    description.
                                                </p>
                                                <Field name="title">
                                                    {({ input, meta }) => (
                                                        <TextField
                                                            hintText="Title"
                                                            floatingLabelText="Title"
                                                            floatingLabelFixed
                                                            underlineFocusStyle={
                                                                styles.underlineStyle
                                                            }
                                                            floatingLabelStyle={
                                                                styles.floatingLabelStyle
                                                            }
                                                            ref={node => {
                                                                input = node;
                                                            }}
                                                            {...input}
                                                        />
                                                    )}
                                                </Field>
                                                <p />
                                                <Field name="description">
                                                    {({ input, meta }) => (
                                                        <TextField
                                                            hintText="Description"
                                                            floatingLabelText="Description"
                                                            multiLine
                                                            underlineFocusStyle={
                                                                styles.underlineStyle
                                                            }
                                                            floatingLabelStyle={
                                                                styles.floatingLabelStyle
                                                            }
                                                            rows={3}
                                                            ref={node => {
                                                                input = node;
                                                            }}
                                                            {...input}
                                                        />
                                                    )}
                                                </Field>
                                                {this.renderStepActions(2)}
                                            </StepContent>
                                        </Step>
                                        <Step>
                                            <StepLabel>
                                                Categorize Your Item
                                            </StepLabel>
                                            <StepContent>
                                                <p />
                                                <Field name="tags">
                                                    {({ input, meta }) => (
                                                        <SelectField
                                                            multiple
                                                            hintText="Select Categories"
                                                            value={tags}
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            // ref={node => { input = node; }}
                                                            // {...input}
                                                            // {...input}
                                                        >
                                                            {this.menuItems(
                                                                tags
                                                            )}
                                                        </SelectField>
                                                    )}
                                                </Field>
                                                {this.renderStepActions(2)}
                                            </StepContent>
                                        </Step>
                                        <Step>
                                            <StepLabel>
                                                Confirm Things!
                                            </StepLabel>
                                            <StepContent>
                                                <p>
                                                    Great! If you're happy with
                                                    everything, tap the button.
                                                </p>
                                                <RaisedButton
                                                    type="submit"
                                                    label="Confirm"
                                                />
                                            </StepContent>
                                        </Step>
                                    </Stepper>
                                </div>
                            </form>
                        )}
                    </Mutation>
                )}
            />
        );
    }
}

export default Share;
