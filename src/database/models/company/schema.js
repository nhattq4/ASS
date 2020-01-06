const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        parentCompanyId: {
            type: Sequelize.INTEGER(11),
        },
        code: {
            type: Sequelize.STRING(15)
        },
        name: {
            type: Sequelize.STRING(100)
        },
        letterhead: {
            type: Sequelize.STRING(25)
        },
        compRegistrationNo: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        imgPath: {
            type: Sequelize.STRING(150),
        },
        addressId: {
            type: Sequelize.INTEGER(11),
        },
        officeTel1: {
            type: Sequelize.STRING(25)
        },
        officeTel2: {
            type: Sequelize.STRING(25)
        },
        email: {
            type: Sequelize.STRING(45)
        },
        isClaimConfirmation: {
            type: Sequelize.TINYINT(1)
        },
        bizStream: {
            type: Sequelize.STRING(20)
        },
        costCentre: {
            type: Sequelize.STRING(20)
        },
        branchCode: {
            type: Sequelize.STRING(20)
        },
        projectCode: {
            type: Sequelize.STRING(20)
        },
        isReqBizstream: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        isReqCostcentre: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        isReqBrancode: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        isReqProjectcode: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        isCostCentreDepartment: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        isReactivate: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        inactiveDatetime: {
            type: Sequelize.DATE
        },
        isRollout: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        isDeleted: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        isActive: {
            type: Sequelize.TINYINT(1),
            defaultValue: 1
        },
        createdBy: {
            type: Sequelize.STRING(20)
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedBy: {
            type: Sequelize.STRING(20)
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    };
};
