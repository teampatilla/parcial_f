import React, { useState, useEffect } from 'react'
import env from "react-dotenv";
import { Status } from '../../dinamic/Status'
import LoadingOverlay from 'react-loading-overlay';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from 'reactstrap'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const FormModalProduct = ({ modalTitle, colorButton, icon, controller, petitionType, inputs, dataList }) => {
  let baseUrl = env.URL_LOCAL
  switch (process.env.NODE_ENV) {
    case "DEVELOPMENT":
      baseUrl = env.URL_DEV
      break;
    case "PRODUCTION":
      baseUrl = env.URL_PRODUCTION
      break;

    default:
      break;
  }
  const [show, setShow] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [form, setForm] = useState(dataList);
  const [product, setProduct] = useState({});

  const toggle = () => setShow(!show)

  const petitions = async (petition, controller) => {
    switch (petition) {
      case "post":
        return await axios.post(controller, form)
          .then(() => {
            setLoading(true)
            setShow(!show)
            setForm(dataList)
            setLoading(false)
          }).catch(error => {
            setLoading(false)
            console.log(error)
          })
      case "put":
        return await axios.put(controller + "/" + form.id, form)
          .then(() => {
            setLoading(true)
            setShow(!show)
            setLoading(false)
          }).catch(error => {
            setLoading(false)
            console.log(error)
          })
      default:
        break
    }
  }

  const renderStatus = () => {
    return Status.map((val) => {
      return (<option value={val.value}>{val.name}</option>)
    })
  }

  const renderInputs = (inputs) => {
    const renderInput = (value) => {
      return (
        <FormGroup key={`${value.id}-${value.name}`}>
          <Label for={value.id}>{value.name}</Label>
          {value.type !== 'select' ? 
          <Input
            key={value.id}
            onChange={handleChange}
            type={value.type}
            name={value.name}
            id={value.id}
            value={form[value.id] ? form[value.id] : ''}
          /> 
          :
          <Input
            onChange={handleChange}
            defaultValue={form[value.id] ? form[value.id] : "DEFAULT"}
            key={value.id}
            type={value.type}
            name={value.name}
            id={value.id}
          >
              <option value="DEFAULT" disabled>{`Choose a option...`}</option>
              {value.id === 'status' ?  renderStatus() : null}
              {value.id === 'categories' ?  product[value.id] : null}
            </Input>}
        </FormGroup>
      )
    }
    return inputs.map(renderInput)
  }

  useEffect(() => {
    inputs.map((value) => {
      if (value.type === "select") {
        if (value.id !== "status") {
          renderProducts(value)
        }
      }
    })
  }, [])

  const renderProducts = async (value) => {
    return await axios.get(baseUrl + 'categories')
      .then(response => {
        setLoading(true)
        // if (value.id === 'customerID') {
        setProduct({
          ...product,
          categories: response.data.data.map((val) => {
            return <option value={val.id}>{val.name}</option>
          })
        })

        // }
        setLoading(false)
      }).catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  const handleChange = e => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value
    })
  };

  return (
    <Container>
      <Button color={colorButton} size="sm" onClick={toggle}>
        <FontAwesomeIcon icon={icon} />
      </Button>

      <LoadingOverlay
        active={isLoading}
        spinner
      >
        <Modal isOpen={show} toggle={toggle}>
          <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
          <ModalBody>
            <Form>
              {renderInputs(
                inputs.filter(function (value, index, arr) {
                  return value.form
                }),
                dataList
              )}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='success' variant="secondary" onClick={() => petitions(petitionType, controller)}>
              Save
          </Button>
          </ModalFooter>
        </Modal>
      </LoadingOverlay>

    </Container>
  )
}

FormModalProduct.propTypes = {
  colorButton: PropTypes.string,
  dataList: PropTypes.object
}

FormModalProduct.defaultProps = {
  icon: faPlus,
  colorButton: "primary",
  dataList: {}
}

export default FormModalProduct
