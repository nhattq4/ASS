'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Products', 'parentProductsID', {
                type: Sequelize.STRING(20),
            })
        ]).catch(() => {
            console.error('parentProductsID has existed');
        });
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([queryInterface.removeColumn('Products', 'parentProductsID')]).catch(
            () => {
                console.error('parentProductsID not exist');
            }
        );
    }
};
