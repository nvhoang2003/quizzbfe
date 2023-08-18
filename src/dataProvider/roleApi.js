import React from 'react';
import { getApi, putApi, deleteApi } from './baseApi';

const rolePath = "Role";

const RoleApiPath = {
  getListRole: rolePath + '/GetAllRole',
  getRoleById: rolePath + '/GetRoleById/',
  updateRole: rolePath + '/updateRole/',
  deleteRole: rolePath + '/deleteRole/'
}

function getListRole(params) {
  return getApi(RoleApiPath.getListRole, params);
}

function getRoleById(params) {
  return getApi(RoleApiPath.getRoleById + params);
}

function updateRole(id, params) {
  return putApi(RoleApiPath.updateRole + id, params);
}

function deleteRole(params) {
  return deleteApi(RoleApiPath.deleteRole + params)
}

export {
  getListRole,
  getRoleById,
  updateRole,
  deleteRole
}
