import React from 'react';
import Input from '../Common/text-input';
import TextArea from '../Common/text-area';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Combobox from 'react-widgets/lib/Combobox'
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);


class ChangeForm extends React.Component {
  render () {
    let wrapperClass = 'col-sm-2';
    if (this.props.errors.CC_TDate && this.props.errors.CC_TDate.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    return (
      <form>
				<div className="row">
					<div className="col-sm-12">
						<Input
							name="CC_Descpt"
							label="Title"
							placeholder="Enter the title of the change (Required)"
							value={this.props.change.CC_Descpt}
							onChange={this.props.onChange}
							error={this.props.errors.CC_Descpt}
							inputstyle="form-control" />
					</div>
				</div>

      <div className="row">
					<div className="col-sm-6">
						<Input
							name="CC_Code"
							label="Code / Item"
							placeholder="Enter an item code (Required)"
							value={this.props.change.CC_Code}
							onChange={this.props.onChange}
							error={this.props.errors.CC_Code}
							inputstyle="form-control" />
					</div>

					<div className="col-sm-6">
						<Input
							name="CC_Multi"
							label="Multipy Products?"
							placeholder="Does this CC affect multiply products?"
							value={this.props.change.CC_Multi}
							onChange={this.props.onChange}
							error={this.props.errors.CC_Multi}
							inputstyle="form-control" />
					</div>
				</div>

				<div className="row">
					<div className="col-sm-4">
						<Input
							name="CC_ASS"
							label="Associated"
							placeholder="Associated CC or Dev?"
							value={this.props.change.CC_ASS}
							onChange={this.props.onChange}
							error={this.props.errors.CC_ASS}
							inputstyle="form-control" />
					</div>
					<div className="col-sm-4">
						<Input
							name="CC_Champ"
							label="Responsible"
							placeholder="Change Owner (Required)"
							value={this.props.change.CC_Champ}
							onChange={this.props.onChange}
							error={this.props.errors.CC_Champ}
							inputstyle="form-control" />
					</div>
					<div className="col-sm-4">
						<Input
							name="CC_Comp"
							label="Company"
							placeholder="Company impacted (Required)"
							value={this.props.change.CC_Comp}
							onChange={this.props.onChange}
							error={this.props.errors.CC_Comp}
							inputstyle="form-control" />
					</div>
				</div>
				<div className="row">
					<div className={wrapperClass}>
						<label className="control-label" htmlFor="CC_TDate">Target Date</label>
						<DateTimePicker
							name="CC_TDate"
							value={ !this.props.change.CC_TDate ? null : new Date(this.props.change.CC_TDate)}
							selected={new Date(this.props.change.CC_TDate)}
							onChange={this.props.onDateChange.bind(null, "CC_TDate")}
							time={false}
							format={'DD/MM/YY'}/>
					</div>
					<div className="col-sm-2">
						<label className="control-label" htmlFor="CC_CDate">Date Completed</label>
						<DateTimePicker
							name="CC_CDate"
							value={ !this.props.change.CC_CDate ? null : new Date(this.props.change.CC_CDate)}
							selected={new Date(this.props.change.CC_CDate)}
							onChange={this.props.onDateChange.bind(null, "CC_CDate")}
							time={false}
							format={'DD/MM/YY'}/>
					</div>
					<div className="col-sm-1">
						<Input
							name="CC_Pry"
							label="Priority"
							value={this.props.change.CC_Pry}
							onChange={this.props.onChange}
							error={this.props.errors.CC_Pry}
							inputstyle="form-control"  />
					</div>
					<div className="col-sm-4">
						<label className="control-label" htmlFor="CC_Stat">Change Status</label>
							<Combobox
								valueField='id'
								textField='name'
								data={this.props.status}
								value={this.props.change.CC_Stat}
								defaultValue={1}
								onChange={this.props.onSelectChange.bind(null, "CC_Stat")}/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<TextArea
							name="CC_Curt"
							label="Current Situation"
							value={this.props.change.CC_Curt}
							rows="4"
							onChange={this.props.onChange}
							error={this.props.errors.CC_Curt}
							inputstyle="form-control" />
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<TextArea
							name="CC_Prop"
							label="Proposed Situation"
							value={this.props.change.CC_Prop}
							rows="4"
							onChange={this.props.onChange}
							error={this.props.errors.CC_Prop}
							inputstyle="form-control" />
					</div>
				</div>
                <div className="row">
					<div className="col-sm-12">
						<TextArea
							name="CC_Rat"
							label="Justification and Rational"
							value={this.props.change.CC_Rat}
							rows="4"
							onChange={this.props.onChange}
							error={this.props.errors.CC_Rat}
							inputstyle="form-control" />
					</div>
				</div>



				<input type="submit" value="Save" className="btn btn-primary pull-right" onClick={this.props.onSave} />
				<input type="submit" value="Cancel" className="btn btn-info pull-right dp-margin-10-LR" onClick={this.props.onCancel} />

			</form>
    )

  }
}

ChangeForm.propTypes = {
  change : React.PropTypes.object.isRequired,
  onSave : React.PropTypes.func.isRequired,
  onChange : React.PropTypes.func.isRequired,
  errors : React.PropTypes.object
}

export default ChangeForm;
