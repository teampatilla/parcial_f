import React, { useState, useEffect } from 'react'
import env from "react-dotenv";
import { SubmitModel } from './SubmitModel'
import Cookies from 'universal-cookie';
import Table from '../dinamic/Table'
import NavMenu from '../NavMenu';
import axios from 'axios'
import FormModal from '../dinamic/Forms/FormModal';
import { faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  Button,
} from 'reactstrap'
import ProgressBar from '../dinamic/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Submit = (props) => {
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
  const cookies = new Cookies()

  const [data, setData] = useState(null)

  const getSubmit = async () => {
    await axios.get(baseUrl + "submits")
      .then(response => {
        setData(response.data.data)
      }).catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (!cookies.get('form')) {
      props.history.push('/');
    } else {
      getSubmit()
    }
  })

  const renderActionButtons = (title, actions = ['create']) => {
    const renderActions = (data) => {
      switch (data) {
        case 'create':
          return (
            <FormModal
              modalTitle="New"
              colorButton="success"
              icon={faPlus}
              controller={baseUrl + "submit"}
              petitionType="post"
              inputs={title}
            />
          )
        case 'edit':
          return (
            <FormModal
              modalTitle="Update"
              colorButton="primary"
              icon={faEdit}
              controller={baseUrl + "submit"}
              petitionType="put"
              dataList={{}}
            />
          )
        case 'delete':
          return (
            <Button color="danger" size="sm">
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          )

        default:
          break
      }
    }
    return actions.map(renderActions)
  }

  return (
    <div className="Container">
      <NavMenu />
      <Container>
        <h5>Submit List</h5>
        <div>{renderActionButtons(SubmitModel, ['create'])}</div>
        {data ? <Table title={SubmitModel} data={data} baseUrl={baseUrl + "submit"} /> : <ProgressBar color="black" colorBar="grey"></ProgressBar>}
      </Container>
    </div>
  )
}

export default Submit
