
import React from 'react';

export default class modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ value: '', modalStatus: false, modalClose: false, description: '', descriptionStatus: false, textValue: false });
    this.modalEffect = this.modalEffect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitTwo = this.handleSubmitTwo.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.switchCardTitle = this.switchCardTitle.bind(this);
    this.updateCardTitle = this.updateCardTitle.bind(this);
    this.closeModdal = this.closeModal.bind(this);
    this.descriptionInfo = this.descriptionInfo.bind(this);
    this.descriptionStatus = this.descriptionStatus.bind(this);
    this.infoDescription = this.infoDescription.bind(this);
    this.saveBtn = this.saveBtn.bind(this);
  }

  componentDidUpdate(prev) {
    const column = this.props.columnNumber;
    const card = this.props.cardNumber;
    if (prev.masterCharacter !== this.props.masterCharacter) {
      const updatedtitle = this.props.masterCharacter[column].list[card].name;
      this.setState({ value: updatedtitle });
    }

    if (prev.modal !== this.props.modal) {
      this.setState({ modalClose: this.props.modal });
    }
  }

  infoDescription() {
    if (this.state.descriptionStatus) {
      return 'pl-4';
    }
    return 'hidden';
  }

  descriptionStatus() {
    if (this.state.descriptionStatus) {
      return 'hidden';
    }
    return 'form-control w-75';
  }

  modalEffect() {
    if (!this.state.modalClose) {
      return 'container centerModal hidden';
    }
    return 'container centerModal ';
  }

  switchModal() {
    if (this.state.modalStatus) {
      return 'w-50';
    }
    return 'hidden';
  }

  descriptionInfo(e) {
    e.preventDefault();
    this.setState({ description: this.state.description });
  }

  saveBtn() {
    this.setState({ textValue: true });
  }

  switchCardTitle() {
    if (this.state.modalStatus) {
      return 'hidden';
    }
    return 'pl-2';
  }

  closeModal() {
    this.setState({ modalClose: false });
  }

  updateCardTitle(e) {
    if (e.key === 'Enter') {
      const column = this.props.columnNumber;
      const card = this.props.cardNumber;
      const character = this.props.masterCharacter;
      character[column].list[card].name = e.target.value;
      this.props.updateMasterCharacter(character);
      this.props.updateColumnComponent(true);
      const name = e.target.value;
      this.setState({ value: name, modalStatus: false });
    }
  }

  handleSubmit(e) {
    const name = e.target.value;
    this.setState({ value: name });
  }

  handleSubmitTwo(e) {
    e.preventDefault();
    this.descriptionInfo();
  }

  selectedListInfo() {
    const column = this.props.columnNumber;
    const card = this.props.cardNumber;
    const character = this.props.masterCharacter;
    if (character.length !== 0) {
      return character[column].list[card].name;
    }
  }

  render() {
    const column = this.props.columnNumber;
    const card = this.props.cardNumber;
    const character = this.props.masterCharacter;
    console.log(this.state.description);
    return (
      <div className={this.modalEffect()}>
        <div className="row d-flex flex-column">
          <div className=" pt-2 pb-50 h-25">
            <div className="d-flex align-items-center pl-2">
              <i className="fas fa-tasks logoSize"></i>
              <h3 className={this.switchCardTitle()}>{this.state.value}</h3>
              <p className={this.switchCardTitle()} onClick={() => this.setState({ value: character[column].list[card].name, modalStatus: true })}>Edit</p>
              <input text="type" className={this.switchModal()} value={this.state.value} onChange={this.handleSubmit} onKeyUp={e => this.updateCardTitle(e)}></input>
            </div>
          </div>
          <div className="col pt-2 descriptionPadding">
            <div className="d-flex align-items-center pl-2">
              <i className="fas fa-database"></i>
              <h3 className="pl-2">Description</h3>
              <p className={this.switchCardTitle()} onClick={() => this.setState({ descriptionStatus: false })}>Edit</p>
            </div>
            <div className="pl-2">
              <form onChange={e => this.setState({ description: e.target.value })} >
                <textarea className={this.descriptionStatus()} id="exampleFormControlTextarea1" rows="2"></textarea>
                <p className={this.infoDescription()} onClick={() => this.setState({ descriptionStatus: false })}>{this.state.description}</p>
                <button type="submit" className="btn btn-success mt-2" onClick={e => this.descriptionInfo(e)}>Save</button>
                <button type="button" className="btn btn-danger mt-2 ml-1" onClick={e => this.setState({ descriptionStatus: true })}>Cancel</button>
              </form>
            </div>
          </div>
          <div>
            <button type="button" className="btn btn-light" onClick={() => this.closeModal()}>Close</button>
          </div>
        </div>
      </div>

    );
  }
}
