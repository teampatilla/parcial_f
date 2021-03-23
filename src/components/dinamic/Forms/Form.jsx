import React, {useState} from 'react'
import {
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import { Status } from '../Status'
import PropTypes from 'prop-types'

const FormURS = ({ inputs, data }) => {
  const [form, setForm] = useState(data);

  const renderStatus = () => {
    let stat = [<option value="DEFAULT" disabled>{`Choose a option...`}</option>]
    return stat.concat(Status.map((val) => {
      return (<option value={val.value}>{val.name}</option>)
    }))
  }

  const renderInputs = (textField, dataList) => {
    const renderImput = (value) => {
      return (
        <FormGroup key={`${value.id}-${value.name}`}>
          <Label for={value.id}>{value.name}</Label>
          <Input
            onChange={handleChange}
            type={value.type}
            name={value.name}
            id={value.id}
            value={dataList[value.id] ? dataList[value.id] : ''}
          />
        </FormGroup>
      )
    }
    return textField.map(renderImput)
  }

  const handleChange = e => {
    const { id, value } = e.target
    setForm({
      ...form,
      [id]: value
    })
  };

  return (
    <div>
      <Form>
        {renderInputs(
          inputs.filter(function (value, index, arr) {
            return value.form
          }),
          data
        )}
      </Form>
    </div>
  )
}

FormURS.propTypes = {
  inputs: PropTypes.array.isRequired,
  data: PropTypes.object,
}

FormURS.defaultProps = {
  data: {},
}

export default FormURS
