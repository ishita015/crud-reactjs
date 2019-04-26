import React, { Component } from 'react';
import { Table, Modal, ModalBody, ModalHeader, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { stringify } from 'querystring';

export default class App extends Component {
  state = {
    fields: [],
    newFieldData: {
      firstName: '',
      lastName: '',
      _id: '',

    },
    test: '',
    editFieldData: {
      firstName: '',
      lastName: '',
      _id: ''
    },
    newFieldModal: false,
    editFieldModal: false
  }
  componentWillMount() {
    
  }
  toggleNewFieldModal() {
    this.setState({
      newFieldModal: !this.state.newFieldModal
    })
  }
  toggleEditFieldModal() {
    this.setState({
      editFieldModal: !this.state.editFieldModal
    })
  }
  handleChange(e) {
    let { newFieldData } = this.state;
    newFieldData.firstName = e.target.value;


    this.setState({
      newFieldData
    });
  }
  handleEvent(e) {
    let { newFieldData } = this.state;
    newFieldData.lastName = e.target.value;

    this.setState({
      newFieldData
    });

  }
  handleFirst(e) {
    let { editFieldData } = this.state;
    editFieldData.firstName = e.target.value;
    this.setState({
      editFieldData
    });
  }
  handleLast(e) {
    let { editFieldData } = this.state;
    editFieldData.lastName = e.target.value;
    this.setState({ editFieldData });
  }
  addField() {


    return axios.post('http://localhost:3300/details', this.state.newFieldData)
      .then((result) => {
        // console.log('yyyy',result);

        let { fields } = this.state;


        fields.push(this.state.newFieldData);


        this.setState({

          fields, newFieldModal: false, newFieldData: {
            firstName: '',
            lastName: ''
          },
        });

        console.log('getting id >>>>>>>', result.data.data._id);
        this.test = result.data.data._id
        // console.log('got id is:',this.test);

      });
  }
  editField(_id, firstName, lastName) {
    this.setState({
      editFieldData: { firstName, lastName }, editFieldModal: !this.state.editFieldModal
    })

  }
  updateField() {
    let { _id, firstName, lastName } = this.state.editFieldData;
    console.log('id is ', this.state.editFieldData._id);

    return axios.post('http://localhost:3300/details/',
      {
        _id: this.test,
        firstName: this.state.editFieldData.firstName,
        lastName: this.state.editFieldData.lastName
      }).then((
        result => {

        this.refresh();
          console.log('update res is:', result.data);
          
          this.setState({
            editFieldModal: false, editFieldData: { _id: this.state._id, firstName: this.state.firstName, lastName: this.state.lastName }
          })



        }
      ))

  }
  refresh(){
    return axios.get('http://localhost:3300',)
      .then((result) => {
        this.setState({
          fields: result.data
        })
      });

  }
  deleteField(_id){
    console.log("delete" + _id);
   
   return axios.delete('http://localhost:3300/details/:_id' + _id)
     .then((result) =>{
       console.log('deletexxxxxxxxxxxxxxxxxxxxx',result);
       
       this.refresh();
     });
  }
  render() {
    let fields = this.state.fields.map((field, key) => {



      return (
        <tr key={key}>
          <td>{key + 1}</td>

          <td>{field.firstName}</td>
          <td>{field.lastName}</td>

          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editField.bind(this, field._id, field.firstName, field.lastName)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteField.bind(this, field._id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">
        <h1>Student Information</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewFieldModal.bind(this)}>Add Field</Button>
        <Modal isOpen={this.state.newFieldModal} toggle={this.toggleNewFieldModal}>
          <ModalHeader toggle={this.toggleNewFieldModal.bind(this)}>Add a new field</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="firstname">First Name</Label>
              <Input id="firstname" value={this.state.newFieldData.firstName} onChange={this.handleChange.bind(this)} />
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Last Name</Label>
              <Input id="lastname" value={this.state.newFieldData.lastName} onChange={this.handleEvent.bind(this)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addField.bind(this)}>Add</Button>
            <Button color="secondary" onClick={this.toggleNewFieldModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editFieldModal} toggle={this.toggleEditFieldModal}>
          <ModalHeader toggle={this.toggleEditFieldModal.bind(this)}>Edit a new field</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="firstname">First Name</Label>
              <Input id="firstname" value={this.state.editFieldData.firstName} onChange={this.handleFirst.bind(this)} />
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Last Name</Label>
              <Input id="lastname" value={this.state.editFieldData.lastName} onChange={this.handleLast.bind(this)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateField.bind(this)}>Update</Button>
            <Button color="secondary" onClick={this.toggleEditFieldModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fields}
          </tbody>
        </Table>

      </div>
    )
  }
}

