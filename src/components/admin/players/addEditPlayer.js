import React, { Component } from 'react'
import AdminLayout from '../../../HoC/Admin_layout';

import FormField from '../../UI/formFields';
import { validate } from "../../UI/misc";

import Fileuploader from '../../UI/fileuploader';
import { firebasePlayers, firebaseData, firebase } from "../../../firebase";

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

    updateFields = (player, playerId, formType, defaultImg) => {
        const newFormData = { ...this.state.formdata }

        for (let key in newFormData) {
            newFormData[key].value = player[key];
            newFormData[key].valid = true;
        }

        this.setState({
            playerId,
            defaultImg,
            formType,
            formdata: newFormData,
        })
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;

        if (!playerId) {
            this.setState({
                formType: 'Add player',
            })
        } else {
            firebaseData.ref(`players/${playerId}`).once('value')
                .then(snapshot => {
                    const playerData = snapshot.val();

                    firebase.storage().ref('players')
                        .child(playerData.image).getDownloadURL()
                        .then(url => {
                            this.updateFields(playerData, playerId, 'Edit player', url)
                        }).catch(e => {
                            this.updateFields({ ...playerData, image: '' }, playerId, 'Edit player', '')
                        })
                })
        }
    }

    updateForm(element, content = '') {
        const newFormData = { ...this.state.formdata };
        const newElement = { ...newFormData[element.id] };

        if (content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }


        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormData
        })
    }

    successForm = (message) => {
        this.setState({
            formSuccess: message
        });
        setTimeout(() => {
            this.setState({
                formSuccess: '',
            })
        }, 2000)
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
            if (this.state.formType === 'Edit player') {
                firebaseData.ref(`players/${this.state.playerId}`)
                    .update(dataToSubmit).then(() => {
                        this.successForm('Update correctly');
                        this.props.history.push('/admin_players');
                    }).catch(e => {
                        this.setState({ formError: true, })
                    })
            } else {
                firebasePlayers.push(dataToSubmit).then(() => {
                    this.props.history.push('/admin_players')
                }).catch(e => {
                    this.setState({
                        formError: true,
                    })
                })
            }
        } else {
            this.setState({
                formError: true,
            })
        }
    }

    resetImage = () => {
        const newFormData = { ...this.state.formdata }
        newFormData['image'].value = '';
        newFormData['image'].value = false;
        this.setState({
            defaultImg: '',
            formdata: newFormData,
        })
    }

    storeFilename = (filename) => {
        this.updateForm({ id: 'image' }, filename)
    }

    render() {
        return (
            <div>
                <AdminLayout>
                    <div className="editplayers_dialog_wrapper">
                        <h2>{this.state.formType}</h2>
                        <div>
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <Fileuploader
                                    dir="players"
                                    tag={"Player image"}
                                    defaultImg={this.state.defaultImg}
                                    defaultImgName={this.state.formdata.image.value}
                                    resetImage={() => this.resetImage()}
                                    filename={(filename) => this.storeFilename(filename)}
                                />

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
