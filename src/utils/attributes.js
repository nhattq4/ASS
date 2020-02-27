module.exports = {
  COMPANY: [
    'id',
    'code',
    'name',
    'letterhead',
    'imgPath',
    'addressId',
    'officeTel1',
    'officeTel2',
    'email',
    'isReactivate',
    'inactiveDatetime',
    'isDeleted',
    'isActive',
    'createdBy',
    'createdAt',
    'updatedBy',
    'updatedAt'
  ],
  EMPLOYEE: [
    'id',
    'companyId',
    'employeeCode',
    'password',
    'fullName',
    'email',
    'contactNo',
    'isActive',
    'isDeleted',
    'createdBy',
    'createdAt',
    'updatedBy',
    'updatedAt'
  ],
  ROLE: [
    'id',
    'name',
    'description',
    'isActive',
    'isDeleted',
    'createdBy',
    'createdAt',
    'updatedBy',
    'updatedAt'
  ]
};
