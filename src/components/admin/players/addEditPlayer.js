import React, { Component } from 'react'
import AdminLayout from '../../../HoC/Admin_layout';

import FormField from '../../UI/formFields';
import { validate } from "../../UI/misc";

import { firebasePlayers, firebaseData, firebase } from "../../../firebase";

class addEditPlayer extends Component {

    state = {
        playerId: '',
        formType: 'Edit Match',
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
            }
        }
    }

    render() {
        return (
            <div>
                <AdminLayout>
                    <div className="editplayers_dialogue_wrapper">
                        <h2>{this.state.formType}</h2>
                    </div>
                </AdminLayout>
            </div>
        )
    }
}

export default addEditPlayer;
