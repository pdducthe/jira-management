import React from 'react'
import { lazy } from 'react'
import EditUser from '../../modules/form-edit-user/EditUser'
import FormEditUser from '../../modules/form-edit-user/FormEditUser'

import TableUserManagement from "../../modules/table-user-management/TableUserManagement"

const UserManagement = () => {
  return (
    <div>
      <TableUserManagement/>
    </div>
  )
}

export default UserManagement