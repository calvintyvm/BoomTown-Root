import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import moment from 'moment';
import * as firebase from 'firebase';
import { firebaseAuth } from '../../config/firebaseConfig';
import Gravatar from 'react-gravatar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
    Card,
    CardActions,
    CardHeader,
    CardTitle,
    CardMedia,
    CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './styles.css';
import placeholder from '../../images/placeholder.jpg';

const config = {
    storageBucket: 'boomtown-c8fa1.appspot.com'
};
// firebase.initializeApp(config);

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
        tags: [],
        // state for new item
        newImageurl: '',
        newDescription: 'Profound Item Description',
        newTitle: 'Amazing Item Title',
        completed: 0,
        title: ' ',
        description: ' '
    };

    onSubmit(values, addItem) {
        console.log('Submitted!');
    }

    validatation(title, description) {
        // true means invalid, so our conditions got reversed
        if (title.length > 0 && description.length > 0) {
            return this.setState({ disabled: true });
        }
        return null;
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
    progress(completed) {
        if (completed > 100) {
            this.setState({ completed: 100 });
        } else {
            this.setState({ completed });
            const diff = Math.random() * 10;
            this.timer = setTimeout(
                () => this.progress(completed + diff),
                1000
            );
        }
    }

    validate = formValues => {
        console.log('Validating', formValues, this.state.tags);
    };

    handleTags = values => {
        this.state.tags.map(tag => tag.tags.toString());
    };

    handleChange = (event, index, tags) => this.setState({ tags });

    handleImage = () => {
        this.setState({ disabled: true });
    };

    handleImageUpload = input => {
        console.log(input.target.files[0].name);
        const storageRef = firebase.storage().ref();
        const file = input.target.files[0];
        const name = `${+new Date()} - ${file.name}`;
        const metadata = {
            contentType: file.type
        };
        const task = storageRef.child(name).put(file, metadata);
        task
            .then(snapshot => {
                const url = snapshot.downloadURL;
                console.log(url);
                this.setState({ newImageurl: url });
            })
            .catch(error => {
                console.log(error);
            });
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

    handleUpdateTitle = e => {
        this.setState({ newTitle: e.target.value });
        // console.log(e.target.value);
    };

    handleUpdateDescription = e => {
        this.setState({ newDescription: e.target.value });
    };

    handleSelectClick = () => {
        document.getElementById('imageInput').click();
        this.setState({ disabled: false });
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
        // const errors = this.validatation(
        //     this.state.title,
        //     this.state.description
        // );
        // console.log(errors);

        return (
            <div className="main">
                <div className="card-preview">
                    <Card>
                        <CardMedia>
                            <img
                                src={
                                    this.state.newImageurl
                                        ? this.state.newImageurl
                                        : placeholder
                                }
                                alt="Preview"
                            />
                        </CardMedia>

                        <CardHeader
                            subtitle={moment().fromNow()}
                        />
                        <CardTitle
                            title={this.state.newTitle}
                            subtitle={this.state.tags.map((tag, index) => (
                                <span key={index}>
                                    {(index ? ', ' : '') + tag.title.toString()}
                                </span>
                            ))}
                        />
                        <CardText>{this.state.newDescription}</CardText>
                    </Card>
                </div>

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
                                            imageurl: this.state.newImageurl,
                                            available: true,
                                            tags: this.state.tags.map(tag =>
                                                tag.id.toString()
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
                                                        We live in a visual
                                                        culture. Upload an image
                                                        of the item you're
                                                        sharing.
                                                    </p>
                                                    <LinearProgress
                                                        mode="determinate"
                                                        value={
                                                            this.state.completed
                                                        }
                                                        className="progress"
                                                    />
                                                    <Field name="image">
                                                        {({ input, meta }) => (
                                                            <RaisedButton
                                                                label="Select an Image"
                                                                onClick={
                                                                    this
                                                                        .handleSelectClick
                                                                }
                                                            >
                                                                <input
                                                                    type="file"
                                                                    accept="image/jpeg, image/png, image/gif"
                                                                    id="image"
                                                                    {...input}
                                                                    hidden
                                                                    id="imageInput"
                                                                    onChange={
                                                                        this
                                                                            .handleImageUpload
                                                                    }
                                                                    ref={node => {
                                                                        input = node;
                                                                    }}
                                                                />
                                                            </RaisedButton>
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
                                                        you're sharing. Give
                                                        them a clue by adding a
                                                        title & description.
                                                    </p>
                                                    <Field name="title">
                                                        {({ input, meta }) => (
                                                            <TextField
                                                                hintText="Title"
                                                                onInput={
                                                                    this
                                                                        .handleUpdateTitle
                                                                }
                                                                floatingLabelText="Title"
                                                                floatingLabelFixed
                                                                underlineFocusStyle={
                                                                    styles.underlineStyle
                                                                }
                                                                floatingLabelStyle={
                                                                    styles.floatingLabelStyle
                                                                }
                                                                // ref={node => {
                                                                //     input = node;
                                                                // }}
                                                                {...input}
                                                            />
                                                        )}
                                                    </Field>
                                                    <p />
                                                    <Field name="description">
                                                        {({ input, meta }) => (
                                                            <TextField
                                                                onInput={
                                                                    this
                                                                        .handleUpdateDescription
                                                                }
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
                                                                // onInput={
                                                                //     this
                                                                //         .handleTags
                                                                // }
                                                                // ref={node => { input = node; }}
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
                                                        Great! If you're happy
                                                        with everything, tap the
                                                        button.
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
            </div>
        );
    }
}

export default Share;
