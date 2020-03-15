const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Db = require('../../database/db');
const Employees = require('../../database/models/employees');
const EmployeeRoles = require('../../database/models/employeeRoles');

const _ = require('lodash');
const utils = require('../../utils/utils');
const errorHandler = require('../../utils/errorHandler');
const attributes = require('../../utils/attributes');
const uuid = require('uuid/v4');

const STATUS = {
  ADDED: 'ADDED',
  UPDATED: 'UPDATED',
  DELETED: 'DELETED'
};

search = async (req, res, next) => {
  let { page, limit, pagination, order, search, filter } = req.body;
  let whereConditions = [...utils.generateSearchQuery(search), ...utils.generateFilterQuery(filter)];
  let where;
  if (whereConditions.length) {
    where = {
      [Op.or]: whereConditions
    };
  }

  const { employees, error } = await Employee.getEmployees(pagination, order, where, attributes.EMPLOYEE)
    .then(employees => ({ employee }))
    .catch(error => ({ error }));

  if (error) {
    return res.status(errorHandler.INVALID_PARAMETER.status).send(errorHandler.INVALID_PARAMETER);
  }

  employees.page = page;
  employees.limit = limit;
  employees.order = order;
  res.json(employees);
};

create = async (req, res, next) => {
  // data transform
  let employee = req.body;
  let employeePayload = {
    id: uuid(),
    companyId: employee.companyId,
    employeeCode: employee.employeeCode,
    fullName: employee.fullName,
    email: employee.email,
    createdBy: employee.createdBy,
    createdAt: new Date(employee.createdAt),
    isActive: employee.isActive,
  };

  // validation
  let error = await validate('create', employeePayload);
  if (error) {
    return res.status(error.status).send(error);
  }

  // Process
  return await Employees.sequelize
    .transaction(async t => {
      let createdEmployee = await Employees.create(employeePayload, { transaction: t });
      // let employeeCompaniesPayload = employeeCompanies.map(company => {
      //     return {
      //         employeeId: createdEmployee.id,
      //         parentCompanyId: company.parentCompanyId,
      //         companyId: company.companyId,
      //         isDefaultCompany: company.isDefaultCompany ? 1 : 0,
      //         isDefaultLoginCompany: company.isDefaultLoginCompany ? 1 : 0,
      //         isActive: 1,
      //         isDeleted: 0
      //     };
      // });
      // let employeeRolesPayload = roles.map(role => {
      //     return {
      //         employeeId: createdEmployee.id,
      //         roleId: role.id
      //     };
      // });
      // await EmployeeCompanies.bulkCreate(employeeCompaniesPayload, { transaction: t });
      // await EmployeeRoles.bulkCreate(employeeRolesPayload, { transaction: t });

      return { createdEmployee };
    })
    .then(payload => res.json({ code: 200, message: 'successfully', payload }))
    .catch((error) => {
      console.log(error.message);
      res.status(errorHandler.CREATE_FAILED.status).send(errorHandler.CREATE_FAILED)
    });
};

update = async (req, res, next) => {
  let { employee, employeeCompanies = [], roles = [] } = req.body;
  let employeePayload = {
    id: employee.id,
    employeeCode: employee.employeeCode,
    username: employee.username,
    fullName: employee.fullName,
    email: employeeuser.email,
    isActive: employee.isActive,
    isDeleted: employee.isDeleted
  };

  let error = validate('update', req.body);
  if (error) {
    return res.status(error.status).send(error);
  }

  return await Employees.sequelize
    .transaction(async t => {

      let listPromiseEmployeeCompanies = employeeCompanies.map(company => {
        if (company.status == STATUS.ADDED) {
          return EmployeeParentCompanies.create(
            {
              ...company,
              employeeId: employeePayload.id
            },
            {
              where: {
                employeeId: employeePayload.id,
                companyId: company.companyId
              },
              transaction: t
            });
        }

        if (company.status == STATUS.UPDATED) {
          return EmployeeParentCompanies.update(
            {
              isDefaultCompany: company.isDefaultCompany ? 1 : 0,
              isDefaultLoginCompany: company.isDefaultLoginCompany ? 1 : 0
            },
            {
              where: {
                employeeId: employeePayload.id,
                companyId: company.companyId
              },
              transaction: t
            });
        }

        if (company.status == STATUS.DELETED) {
          return EmployeeCompanies.destroy({
            where: {
              employeeId: employeePayload.id,
              companyId: company.companyId
            },
            transaction: t
          });
        }
      });

      let listPromiseRoles = roles.map(role => {
        if (role.status == STATUS.ADDED) {
          return EmployeeRoles.create(
            {
              employeeId: employeePayload.id,
              roleId: role.id
            },
            { transaction: t }
          );
        }

        if (role.status == STATUS.DELETED) {
          return EmployeeRoles.destroy(
            {
              where: {
                employeeId: employeePayload.id,
                roleId: role.id
              }
            },
            { transaction: t }
          );
        }
      });

      await Employees.updateEmployee(employeePayload, { employeeId: employee.employeeId }, t);
      await Promise.all(listPromiseEmployeeCompanies);
      await Promise.all(listPromiseRoles);

      return { employee, employeeCompanies, roles };
    })
    .then(payload => res.json({ code: 200, message: 'successfully', payload }))
    .catch(() => res.status(errorHandler.UPDATE_FAILED.status).send(errorHandler.UPDATE_FAILED));
};

getByEmail = async (req, res, next) => {
  const { email } = req.body;

  let validationResult = errorHandler.validate([email]);
  if (validationResult) {
    return res.status(validationResult.status).send(validationResult);
  }

  const employee = await Employees.get({ email: email });
  if (!employee) {
    return res.status(errorHandler.USER_NOT_FOUND.status).send(errorHandler.USER_NOT_FOUND);
  }

  res.json(_.pick(employee, attributes.EMPLOYEE));
};

getByEmployee = async (req, res, next) => {
  const { employeeId, employeeName } = req.body;

  let validationResult = errorHandler.validate([employeeId, employeeName]);
  if (validationResult) {
    return res.status(validationResult.status).send(validationResult);
  }

  const user = await Users.get({ employeeId, fullName: employeeName });
  if (!user) {
    return res.status(errorHandler.USER_NOT_FOUND.status).send(errorHandler.USER_NOT_FOUND);
  }

  res.json(_.pick(user, attributes.USER));
};

updateEmailByEmployee = async (req, res, next) => {
  const { employeeId, employeeName, email } = req.body;
  const data = { username: email };
  const where = {
    employeeId,
    fullName: employeeName,
    username: { [Op.or]: ['', null] }
  };

  const updatedUser = await Employees.updateUser(data, where, null);
  if (!updatedUser) {
    return res.status(errorHandler.UPDATE_FAILED.status).send(errorHandler.UPDATE_FAILED);
  }

  res.json(_.pick(updatedUser, attributes.USER));
};

let validate = async (type, data) => {
  let fields = [
    data.id,
    data.employeeCode,
    data.fullName,
    data.email,
    data.isActive
  ];

  let validationResult = errorHandler.validate(fields);
  if (validationResult) {
    return errorHandler.INVALID_PARAMETER;
  }

  // if (!Array.isArray(data.userParentCompanies) || !Array.isArray(data.roles)) {
  //     throw errorHandler.INVALID_PARAMETER;
  // }

  if (type === 'create') {
    let isExistedEmployee = await Employees.get({ employeeCode: data.employeeCode });
    if (isExistedEmployee) {
      return errorHandler.USER_WAS_EXISTED;
    }
  }

  if (type === 'update') {
    let isExistedEmployee = await Employees.get({ employeeCode: data.employeeCode });
    if (!isExistedEmployee) {
      return errorHandler.USER_NOT_EXISTS;
    }
  }

  return null;
};

module.exports = {
  search,
  create,
  update,
  getByEmail,
  getByEmployee,
  updateEmailByEmployee
};
