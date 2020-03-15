const Employees = require('../../database/models/employees');
const Companies = require('../../database/models/companies');

const _ = require('lodash');
const utils = require('../../utils/utils');
const errorHandler = require('../../utils/errorHandler');
const attributes = require('../../utils/attributes');
const uuid = require('uuid/v4');

validateEmployeeId = async (req, res, next, employeeId) => {
	const where = {
		employeeId
	};
	const company = await EmployeeCompanies.get(where);

	if (!company) {
		return res.status(404).send(errorHandler.COMPANY_NOT_FOUND);
	}

	req._company = company;
	next();
};

getByEmployeeId = async (req, res, next) => {
	const where = {
		employeeId: req.params.employeeId
	};

	const companies = await EmployeeCompanies.getByEmployeeId(where, attributes.COMPANY);

	res.json(companies);
};

getByUsername = async (req, res, next) => {
	let where = {
		username: req.body.username
	};

	const employee = await Employees.findOne({
		where
	});

	if (!employee) {
		return res.status(404).send(errorHandler.USER_NOT_FOUND);
	}

	where = {
		employeeId: employee.id
	};

	const companies = await EmployeeCompanies.getByUserId(where, attributes.COMPANY);

	res.json(companies);
};

createCompany = async (request, response, next) => {
	// data transform
	let company = request.body;
	let companyPayload = {
		id: uuid(),
		code: company.code,
		name: company.name,
		letterhead: company.letterhead,
		imgPath: company.imgPath,
		addressId: company.addressId,
		officeTel1: company.officeTel1,
		officeTel2: company.officeTel2,
		email: company.email,
		createdBy: company.createdBy,
		createdAt: new Date(company.createdAt)
	};

	// validation
	let error = await validate('create', company);
	if (error) {
		return response.status(error.status).send(error);
	}

	// Process
	return await Companies.sequelize
		.transaction(async t => {
			let createCompany = await Companies.create(companyPayload, { transaction: t });
			return createCompany;
		})
		.then(payload => {
			console.log('finish create');
			response.json({ code: 200, message: 'successfully', payload })
		})
		.catch((error) => {
			errorHandler.CREATE_FAILED["errorMessageSystems"] = error.message;
			response.status(errorHandler.CREATE_FAILED.status).send(errorHandler.CREATE_FAILED)
		});
};



//Private method
let validate = async (type, data) => {
	var fields = [
		data.code,
		data.name,
		data.addressId,
		data.email
	];

	let validationResult = errorHandler.validate(fields);
	if (validationResult) {
		return errorHandler.INVALID_PARAMETER;
	}

	if (type === 'create') {
		let isExistedCompany = await Companies.get({ name: data.code });
		if (isExistedCompany) {
			return errorHandler.COMPANY_WAS_EXISTED;
		}
	}

	if (type === 'update') {
		let isExistedCompany = await Companies.get({ id: data.id });
		if (!isExistedCompany) {
			return errorHandler.COMPANY_NOT_FOUND;
		}
	}

	return null;
};

module.exports = {
	createCompany,
	validateEmployeeId,
	getByEmployeeId,
	getByUsername
};
