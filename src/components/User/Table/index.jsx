import React from 'react'
import { Table, Button, ButtonGroup } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import FormModalUser from './../Form/FormModalUser'
import axios from 'axios'
import PropTypes from 'prop-types'

import './table.css'

const CRUD = ({ title, data, baseUrl }) => {

  const peticionDelete = async (data) => {
    await axios.delete(baseUrl + "/" + data._id)
      .then(response => {

      }).catch(error => {
        console.log(error);
      })
  }

  const renderTableTittle = (header) => {
    const renderTittle = (data) => data.grid ? <th key={data.id}>{data.name}</th> : null
    return header.map(renderTittle)
  }

  const renderData = (headerText, dataList) => {
    const renderUser = (data) => {
      const renderHeader = (key) => {
        if (key.grid) {
          if (key.id === 'actions') {
            return (
              <td key={`${data[key.id]}-${key.id}`}>
                <ButtonGroup size="sm">
                  <FormModalUser
                    modalTitle="Update"
                    colorButton="primary"
                    icon={faEdit}
                    controller={baseUrl}
                    petitionType="put"
                    inputs={headerText}
                    dataList={data}
                  />
                  <Button color="danger" size="sm" onClick={() => peticionDelete(data)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </ButtonGroup>
              </td>
            )
          } if (key.id === 'status') {
            if (data[key.id] === 1) {
              return <td key={`${data[key.id]}-${key.id}`}>Active</td>
            } if (data[key.id] === 0) {
              return <td key={`${data[key.id]}-${key.id}`}>Inactive</td>
            } else {
              return <td key={`${data[key.id]}-${key.id}`}>N/A</td>
            }
          } else {
            return <td key={`${data[key.id]}-${key.id}`}>{data[key.id]}</td>
          }
        }
      }
      return <tr>{headerText.map(renderHeader)}</tr>
    }
    return dataList.map(renderUser)
  }

  return (
    <div>
      <Table dark bordered>
        <thead>
          <tr>{renderTableTittle(title)}</tr>
        </thead>
        <tbody>{renderData(title, data)}</tbody>
      </Table>
    </div>
  )
}

CRUD.propTypes = {
  title: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  baseUrl: PropTypes.string,
  actions: PropTypes.array,
}

export default CRUD
