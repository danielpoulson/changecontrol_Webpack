import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Input from 'components/Common/text-input';
import TextArea from 'components/Common/text-area'
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);
export const fields = ['CC_Descpt', 'CC_Code', 'CC_Multi', 'CC_ASS', 'CC_Champ', 'CC_Comp', 'CC_TDate', 'CC_CDate', 'CC_Pry', 'CC_Stat', 'CC_Curt', 'CC_Prop', 'CC_Rat'];

class ChangeDetail extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  componentDidMount(){
    console.log("This.props");
    console.log(this.props.change);
  }

  handleStartDateChange = (startDate) => {

  };

  render() {
    const {
      fields: {CC_Descpt, CC_Code, CC_Multi, CC_ASS, CC_Champ, CC_Comp, CC_TDate, CC_CDate, CC_Pry, CC_Stat, CC_Curt, CC_Prop, CC_Rat},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label className="control-label" htmlFor="Change">Change Title</label>
              <div className="field">
                <input type="text"
                  className="form-control"
                  placeholder="Title"
                  {...CC_Descpt} />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <Input
              name="CC_Code"
              label="Code / Item"
              placeholder="Enter an item code (Required)"
              inputstyle="form-control"
              {...CC_Code}/>
          </div>

          <div className="col-sm-6">
            <Input
              name="CC_Multi"
              label="Multipy Products?"
              placeholder="Does this CC affect multiply products?"
              inputstyle="form-control"
              {...CC_Multi}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <Input
              name="CC_ASS"
              label="Associated"
              placeholder="Associated CC or Dev?"
              inputstyle="form-control"
              {...CC_ASS}/>
          </div>
          <div className="col-sm-4">
            <Input
              name="CC_Champ"
              label="Responsible"
              placeholder="Change Owner (Required)"
              inputstyle="form-control"
              {...CC_Champ}/>
          </div>
          <div className="col-sm-4">
            <Input
              name="CC_Comp"
              label="Company"
              placeholder="Company impacted (Required)"
              inputstyle="form-control"
              {...CC_Comp}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <label className="control-label" htmlFor="CC_TDate">Target Date</label>
            <DateTimePicker
              format={'DD/MM/YY'}
              name="CC_TDate"
              time={false}
              value={fields.CC_TDate}
            />
          </div>
          <div className="col-sm-2">
            <label className="control-label" htmlFor="CC_CDate">Date Completed</label>

          </div>
          <div className="col-sm-1">
            <Input
              name="CC_Pry"
              label="Priority"
              {...CC_Pry}
              inputstyle="form-control"  />
          </div>
          <div className="col-sm-4">
            <label className="control-label" htmlFor="CC_Stat">Change Status</label>
            <select className="form-control"
              {...CC_Stat}
              value={CC_Stat.value || ''}  // required syntax for reset form to work
              // undefined will not change value to first empty option
              // when resetting
            >
              <option></option>
              <option value="1">Review</option>
              <option value="2">Approved</option>
              <option value="3">On-hold</option>
              <option value="4">Closed</option>
              <option value="5">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <TextArea
              name="CC_Curt"
              label="Current Situation"
              rows="4"
              inputstyle="form-control"
              {...CC_Curt}
              value={CC_Curt.value || ''}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <TextArea
              name="CC_Prop"
              label="Proposed Situation"
              {...CC_Prop}
              value={CC_Prop.value || ''}
              rows="4"
              inputstyle="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <TextArea
              name="CC_Rat"
              label="Justification and Rational"
              {...CC_Rat}
              value={CC_Rat.value || ''}
              rows="4"
              inputstyle="form-control" />
          </div>
        </div>

        <div>
          <button disabled={submitting} onClick={handleSubmit}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'change',
  fields,
  },
  state => ({ // mapStateToProps
  initialValues: state.change // will pull state into form's initialValues
  })
)(ChangeDetail);
