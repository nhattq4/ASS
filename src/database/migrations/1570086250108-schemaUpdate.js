'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('user_parent_companies', 'isDefaultLoginCompany', {
                type: Sequelize.TINYINT(1),
                defaultValue: 0
            })
        ]).catch(() => {
            console.error('isDefaultLoginCompany has existed');
        });
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([queryInterface.removeColumn('user_parent_companies', 'isDefaultLoginCompany')]).catch(
            () => {
                console.error('isDefaultLoginCompany not exist');
            }
        );
    }
};
