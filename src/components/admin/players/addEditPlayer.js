import React, { Component } from 'react'
import AdminLayout from '../../../HoC/Admin_layout';

import FormField from '../../UI/formFields';
import { validate } from "../../UI/misc";

import Fileuploader from '../../UI/fileuploader';
import { firebasePlayers, firebaseData, firebase } from "../../../firebase";
import { file } from '@babel/types';

class addEditPlayer extends Component {

    state = {
        playerId: '',
        formType: 'Edit Player',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player name',
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Last name',
                    name: 'lastname_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player number',
                    name: 'number_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a player position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        { key: "Keeper", value: "Keeper" },
                        { key: "Defence", value: "Defence" },
                        { key: "Midfield", value: "Midfield" },
                        { key: "Striker", value: "Striker" }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
            }
        }
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;

        if (!playerId) {
            this.setState({
                formType: 'Add player',
            })
        } else {

        }
    }

    updateForm(element) {
        const newFormData = { ...this.state.formdata };
        const newElement = { ...newFormData[element.id] };

        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormData
        })
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if (formIsValid) {

        } else {
            this.setState({
                formError: true,
            })
        }
    }

    resetImage = () => {

    }

    render() {
        return (
            <div>
                <AdminLayout>
                    <div className="editplayers_dialog_wrapper">
                        <h2>{this.state.formType}</h2>
                        <div>
                            <Fileuploader
                                dir="players"
                                tag={"Player image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formdata.image.value}
                                resetImage={() => this.resetImage()}
                                fileName={(fileName) => this.storeFilename(fileName)}
                            />
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <FormField
                                    id={'name'}
                                    formdata={this.state.formdata.name}
                                    change={(element) => this.updateForm(element)}
                                />
                                <FormField
                                    id={'lastname'}
                                    formdata={this.state.formdata.lastname}
                                    change={(element) => this.updateForm(element)}
                                />
                                <FormField
                                    id={'number'}
                                    formdata={this.state.formdata.number}
                                    change={(element) => this.updateForm(element)}
                                />
                                <FormField
                                    id={'position'}
                                    formdata={this.state.formdata.position}
                                    change={(element) => this.updateForm(element)}
                                />
                                <div className='success_label'>{this.state.formSuccess}</div>
                                {this.state.formError ?
                                    <div className='error_label'>Something is wrong</div>
                                    : ''
                                }
                                <div className='admin_submit'>
                                    <button onClick={(event) => this.submitForm(event)}>
                                        {this.state.formType}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </AdminLayout>
            </div>
        )
    }
}

export default addEditPlayer;
